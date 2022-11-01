
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
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, no minimo uma letra maiuscula, um numero e não deve conter símbolos.'
        
    },
    dataNascimento: {
        valueMissing: 'O campo "data de nascimento" não pode estar vazio.',
        customError: 'Você precisa ter mais que 18 anos de idade para efetuar um cadastro.'
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input)
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
