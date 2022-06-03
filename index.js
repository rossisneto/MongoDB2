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

const Produto = require('./model/Product')
const Usuario = require('./model/User')
const Pedido = require('./model/Order')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ocptv.mongodb.net/loja?retryWrites=true&w=majority`
    )    
    .then(()=>{
        console.log('Conectado ao MongoDB')
    })
    .catch((err)=>console.log(err))




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando Rotas
app.get('/produto/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    
    try {
        /*
        novoProduto = new Produto({
            img: './img/product.png',
            nomeItem: 'camiseta2030-',
            tamanhoItem: 'M',
            precoItem: 39.90,
            estoque: 3,
            qtd: 0
        })
        
        await novoProduto.save()
        */

       const novoProduto = {
            img: './img/product.png',
            nomeItem: 'camiseta2030-',
            tamanhoItem: 'M',
            precoItem: 39.90,
            estoque: 3,
            qtd: 0
       } 
       
       await Produto.create(novoProduto)
       res.status(201).json(novoProduto)
        
    } catch (err) {
        res.status(500).json({msg:'Falha na inclusão:'+err})
        return
    }

    
   
})

app.post('/produto/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    const {img, nomeItem,tamanhoItem,precoItem,estoque,qtd} = req.body
    try {
       const novoProduto = {
            img: img,
            nomeItem: nomeItem,
            tamanhoItem: tamanhoItem,
            precoItem: precoItem,
            estoque: estoque,
            qtd: qtd
       } 
       
       await Produto.create(novoProduto)
       res.status(201).json(novoProduto)
        
    } catch (err) {
        res.status(500).json({msg:'Falha na inclusão:'+err})
        return
    }

    
   
})

app.get('/produto/listar',async (req,res)=>{
    let produtos=[]
    produtos = await Produto.find()
    res.json(produtos)
    return
})

app.get('/usuario/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    novoUsuario = new Usuario({
        img: '/img/users/foto.png',
        nome: 'Joãozinho',
        email: 'joaozinho@mail.com',
        telefone: '+55(34)99199-2020'
    })
    await novoUsuario.save()

    

    res.json(novoUsuario).status(201)
    
})

app.get('/usuario/listar', async(req,res)=>{
    let usuarios=[]
    usuarios = await Usuario.find()
    res.json(usuarios)

    return
})

app.get('/pedidos/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    novoPedido = new Pedido({
        usrId: "6299c072b45b22c2efbbccfd",
        itemsId: ["629914db10c902cba75f628c","62991b138527da99f2a4204b","62991c317457ca5947b03f79"]
    })
    await novoPedido.save()

    

    res.json(novoPedido).status(201)
    
})

app.get('/pedidos/listar', async(req,res)=>{
    let pedidos=[]
    pedidos = await Pedido.find()
    res.json(pedidos)
    return
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Inicializando o serviço
app.listen(process.env.PORT, console.log('serviço ativo - http://localhost:'+process.env.PORT))