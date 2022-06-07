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
//const Pedido = require('-./model/Order')

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Rota principal
router.get('/', (req,res)=>{
    //res.render('produto/index')

})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Rota incluir
router.get('/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    res.render('produto/inclusao')
    //res.status(200).json({msg:'acesso na rota get'})
  
})

router.post('/incluir', async (req,res)=>{
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



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Rota listar 
router.get('/listar',async (req,res)=>{
    console.log('Acesso na rota Produtos/listar')
    let produtos=[]
    produtos = await Produto.find()
    res.json(produtos)
    return
})


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/excluir',async (req,res)=>{
    const id =req.body._id
    let produtos=[]
    produtos = await Produto.findOneAndDelete({_id:id})
    res.json(produtos)
    return
})


module.exports = router