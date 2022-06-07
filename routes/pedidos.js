const express = require('express')
const router = express.Router()
//const mongoose =require('mongoose')
const cors = require('cors')

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando CORS Middleware
router.use(cors())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando JSON Middleware
router.use(
    express.urlencoded({
        extended:true,
    }),
)
router.use(express.json())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Importanto models
const Produto = require('../model/Product')
const Usuario = require('../model/User')
const Pedido = require('../model/Order')


router.get('/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    novoPedido = new Pedido({
        usrId: "6299c072b45b22c2efbbccfd",
        itemsId: ["629914db10c902cba75f628c","62991b138527da99f2a4204b","62991c317457ca5947b03f79"]
    })
    await novoPedido.save()
    res.json(novoPedido).status(201)
    
})

router.get('/listar', async(req,res)=>{
    let pedidos=[]
    pedidos = await Pedido.find()
    res.json(pedidos)
    return
})

module.exports = router