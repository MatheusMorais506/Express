const porta = 3010
 
//importando o express que foi instalado para que seja utilizado nesse ficheiro
const express = require('express') 
 
//instanciar o express atribuindo para uma variavel app e nessa variavel sera colocado os serviços
const app = express()
 
//chamando o arquivo banco de dados:
const baseDeDados = require('./basededados')
 
/*funçao middleware após a instalaçao do body-parser, onde urlencoded vai retornar 
uma funçao middleware que vai fazer um parcer no body da requesiçao. passando como 
parametro um objeto vai estar no modulo extendido
essa linha 19 significa que para qualquer requesiçao que faça no servidor 
usando express obrigatoriamente vai passar por esse middleware da linha 20
e se no corpo da requesiçao tiver um padrao chamado urlencoded vai aplicar
esse middleware que vai fazer um parser que vai traformar em objeto para que seja 
possivel acessar dessa maneira como exemplo nome:req.body.name. 
Como nao colocou nenhuma url expecifica (usou o use) para todas as requisiçoes irá 
realizar.(nas outras foram sitadas:'/produtos' ) */

app.use(express.urlencoded({extended: true}))
app.use(express.json())

/*fazer um teste, get é uma forma de requesiçao
e passando como resposta para essa requesiçao ensima de produto vai passar uma função 
middleware(req= requesicao (nao utilizado para o exemplo) / res = resposta onde a funçao send envia 
uma resposta e mandando como  resposta um objeto é a lista de produtos. esse objeto sera convertido 
para o formato json pois o send faz isso.
     / next chamar nova funçao / */
 
app.get('/produtos', (req,res,next)=>{
    res.send(baseDeDados.getProdutos())
})
 
//buscar um produto em especifico. req.params.id envia os valores que receber do get na url
app.get('/produtos/:id', (req,res,next)=>{
    res.send(baseDeDados.getProduto(req.params.id))
})
 
//metodo post para salvar um produto
//nome e preço vai vir pelo request do body apartir da requesiçao
app.post('/produtos', (req,res,next)=>{
    const produto = baseDeDados.salvarProduto({
        nome:req.body.nome,
        preco:req.body.preco,
    })
    res.send(produto)//retornando o produto como resposta, como json
})//Cadastrar Produtos
 
app.put('/produtos/:id', (req,res,next)=>{
    const produto = baseDeDados.salvarProduto({
        nome:req.body.nome,
        preco:req.body.preco,
        id:req.params.id,
    })
    res.send(produto)//retornando o produto como resposta, como json
})//Alterar valores ja cadastrados

app.delete('/produtos/:id', (req,res,next)=>{
    const produto = baseDeDados.excluirProduto(req.params.id)
    res.send(produto)//retornando o produto como resposta, como json
})//excluir valores ja cadastrados
 
 
/*qual a porta vou ficar escutando. utilizando uma callback para mostrar no console que de 
fato a aplicaçao foi iniciada.*/
app.listen(porta, () =>{
    console.log(`Servidor execultado na porta ${porta}.`)
})