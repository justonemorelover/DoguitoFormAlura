function recuperaCEP(input) {
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

export { recuperaCEP };