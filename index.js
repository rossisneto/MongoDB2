//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//requisição de modulos
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    }),
)
app.use(express.json())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando/Conectando Mongoose
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ocptv.mongodb.net/loja?retryWrites=true&w=majority`
    )    
    .then(()=>{
        console.log('Conectado ao MongoDB')
    })
    .catch((err)=>console.log(err))


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando models (schema)
const produtoSchema = new mongoose.Schema({
    img: String,
    nomeItem: String,
    tamanhoItem: String,
    precoItem: Number,
    estoque: Number,
    qtd: Number,
})

const Produto = mongoose.model('produtos', produtoSchema)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando Rotas
app.get('/incluir',(req,res)=>{
    //Incluindo um registro/documento
    novoProduto = new Produto({
        img: './img/product.png',
        nomeItem: 'camiseta2023-',
        tamanhoItem: 'M',
        precoItem: 39.90,
        estoque: 3,
        qtd: 0
    }).save()

    res.json({msg:'Produto incluido'})
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Inicializando o serviço
app.listen(process.env.PORT, console.log('serviço ativo - http://localhost:'+process.env.PORT))