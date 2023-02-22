
function getSalesProductByNetwork(repository,username){
    return repository.getSalesProductByNetwork(username)
}

function getSaleForProductByNetwork(repository,username,productName){
    return repository.getSaleForProductByNetwork(username,productName)
}

function getProductVirality(repository,productName){
    return repository.getProductVirality(productName)
}

module.exports = {
    getSalesProductByNetwork:getSalesProductByNetwork,
    getSaleForProductByNetwork:getSaleForProductByNetwork,
    getProductVirality:getProductVirality,
}
