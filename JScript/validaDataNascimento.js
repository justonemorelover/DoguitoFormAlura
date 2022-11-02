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

export { validaDataNascimento };