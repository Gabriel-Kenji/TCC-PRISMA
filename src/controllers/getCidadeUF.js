const fetch  = require('node-fetch')


async function getCidade(id){
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/' + id)
    const data = await response.json()
    return data.nome
}

async function getUF(id){
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + id)
    const data = await response.json()
    return data.sigla
}

module.exports.getCidade = getCidade;
module.exports.getUF = getUF;