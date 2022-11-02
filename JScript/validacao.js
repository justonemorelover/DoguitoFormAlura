
export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo "nome" não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo "email" não pode estar vazio.',
        typeMismatch: 'O email deve seguir o padrão: "email@email.com'
    },
    senha: {
        valueMissing: 'O campo "senha" não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, no mínimo uma letra maiúscula, um número e não deve conter símbolos.'
        
    },
    dataNascimento: {
        valueMissing: 'O campo "data de nascimento" não pode estar vazio.',
        customError: 'Você precisa ter mais que 18 anos de idade para efetuar um cadastro.'
    },
    cpf: {
        valueMissing: 'O campo "CPF" não pode estar vazio',
        customError: 'O CPF digitado não é valido'
    },
    cep: {
        valueMissing: 'O campo "CEP" não pode estar vazio',
        patternMismatch: 'O CEP inserido não é valido',
        customError: 'Não foi possivel encontrar informações do CEP.'
    },
    logradouro: {
        valueMissing: 'O campo "logradouro" não pode estar vazio',
    },
    cidade: {
        valueMissing: 'O campo "cidade" não pode estar vazio',
    },
    estado: {
        valueMissing: 'O campo "estado" não pode estar vazio',
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';

    tiposDeErro.forEach(erro => {   
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem;

}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value); //valor passado no imput;
    let mensagem = '';

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você precisa ter mais que 18 anos de idade para efetuar um cadastro.'
    };

    input.setCustomValidity(mensagem); //trata erros de validação 
};

function maiorQue18(data) {
    const dataAtual = new Date(); //declaração em branco é preenchida com data atual;
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

        return dataMais18 <= dataAtual;
};

function validaCPF(input) {

    const cpfFormatado = input.value.replace(/\D/g, ''); //REGEX: Substitui os caracteres não numericos por uma string vazia;
    let mensagem = '';

    if(/*!checaCPFRepetido(cpfFormatado) || */!checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado aqui não é valido';
    };

    input.setCustomValidity(mensagem);
};

// function checaCPFRepetido(cpf) {
//     const valoresRepetidos = [
//         '00000000000',
//         '11111111111',
//         '22222222222',
//         '33333333333',
//         '44444444444',
//         '55555555555',
//         '66666666666',
//         '77777777777',
//         '88888888888',
//         '99999999999'
//     ];

//     let cpfValido = true;

//     valoresRepetidos.forEach(valor => {
//         if(valor = cpf) {
//             cpfValido = false;
//         };
//     });

//     return cpfValido;   
// }

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {
    
    if(multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if(digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }

    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

// FUNÇÃO DESTINADA A BUSCAR INFORMAÇÕES ATRAVÉS DO CEP \\

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET', //tipo de requisição que será feita.
        mode: 'cors', //comunicação será feita entre aplicações diferentes.
        headers: { //como serão recebidas as informações da API.
            'content-type':'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {

        fetch (url, options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possivel encontrar informações do CEP.');
                    return;
                }
                input.setCustomValidity('');
                preencheCamposComCEP(data);
                return;
            }
        )
    }
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}