//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando models (schema)
const mongoose=require('mongoose')

const Produto = mongoose.model('produtos', {
    img: String,
    codBarra: String,
    nomeItem: String,
    tamanhoItem: String,
    precoItem: Number,
    estoque: Number,
    qtd: Number
})

module.exports = Produto
