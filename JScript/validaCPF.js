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

export { validaCPF };