//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//requisição de modulos
require('dotenv').config()

const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

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
    res.render('produto/inclusao')
    //res.status(200).json({msg:'acesso na rota get'})
  
})

app.post('/produto/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    const {img, codBarra,nomeItem,tamanhoItem,precoItem,estoque,qtd} = req.body
    try {
            const novoProduto = {
                img: img,
                codBarra: codBarra,
                nomeItem: nomeItem,
                tamanhoItem: tamanhoItem,
                precoItem: precoItem,
                estoque: estoque,
                qtd: qtd
            } 
       
       await Produto.create(novoProduto).then(result=>{
           console.log(result.insertedId)})
       
       console.log(req.body)
       console.log('Produto incluido no MongoDB!!!')
       res.status(201).render('produto/inclusao', novoProduto)
        
    }catch(err){
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

app.delete('/produto/excluir',async (req,res)=>{
    const id =req.body._id
    let produtos=[]
    produtos = await Produto.findOneAndDelete({_id:id})
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