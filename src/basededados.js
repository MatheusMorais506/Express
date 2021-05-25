//const { response } = require("express")
 
//criado um pequeno objeto que vai representar uma sequencia para pegar os ids dos objetos que vai ser criado
const sequence = {
    _id:1,
    get id() {return this._id++} //retona sempre um proximo valor de id quando chamar o sequence.id usou o get para nao precisar chamar a funçao
}
 
//objeto produto onde a chave vai ser o id do produto e o valor sera o proprio objeto com o id, nome e preço
const produtos = {}
 
/*se o id do produto nao estiver setado, vou fazer
o produto.id recebe o sequence.id e 
depois coloca o produto com com a chave produto que é o objeto criado na linha 8
onde a chave vai ser o produto.id e vai receber o valor de produto (o id, nome e preço)
se o produto já tiver setado substitui pela versao mais nova caso contrario
adciona um novo elemento dentro de produtos */
function salvarProduto(produto){
    if(!produto.id) produto.id = sequence.id
    produtos[produto.id] = produto
    return produto
}
 
//funçao para pegar o produto por id caso seja nulo vai retornar um objeto vazio
function getProduto(id){
    return produtos[id] || {}
}
 
//retornar todos os produtos
function getProdutos(){
    return Object.values(produtos)
}

function excluirProduto(id){
    const produto = produtos[id]
    delete produtos[id]
    return produto
}

//fazer com que as funçoes estejam disponiveis fora desse arquivo
module.exports = {salvarProduto, getProduto, getProdutos,excluirProduto}