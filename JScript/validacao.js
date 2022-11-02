import { validaDataNascimento } from "./validaDataNascimento.js";
import { validaCPF } from "./validaCPF.js";
import { recuperaCEP } from "./validaCEP.js";

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
        valueMissing: 'O campo "CPF" não pode estar vazio.',
        customError: 'O CPF digitado não é valido.'
    },
    cep: {
        valueMissing: 'O campo "CEP" não pode estar vazio.',
        patternMismatch: 'O CEP inserido não é valido.',
        customError: 'Não foi possivel encontrar informações do CEP.'
    },
    logradouro: {
        valueMissing: 'O campo "logradouro" não pode estar vazio.',
    },
    cidade: {
        valueMissing: 'O campo "cidade" não pode estar vazio.',
    },
    estado: {
        valueMissing: 'O campo "estado" não pode estar vazio.',
    },
    preco: {
        valueMissing:'O campo "preço" não pode estar vazio.'
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperaCEP(input)
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


