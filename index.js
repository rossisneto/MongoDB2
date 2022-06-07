//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//requisição de modulos
require('dotenv').config()

const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Importanto os routers
const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/produtos')
//Habilitando as rotas
app.use('/produtos', produtosRouter)
app.use('/pedidos', pedidosRouter)


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando CORS Middleware
app.use(cors())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    }),
)
app.use(express.json())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando View Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout','./layouts/layout')
app.set('views',__dirname+'/views')

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


//Importando models
const Usuario = require('./model/User')
const Pedido = require('./model/Order')

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando Rotas





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Inicializando o serviço
app.listen(process.env.PORT, console.log('serviço ativo - http://localhost:'+process.env.PORT))