function getUserCount(repository){
    return repository.getUserCount()
}
function getProductCount(repository){
    return repository.getProductCount()
}
function getPurchasedCount(repository){
    return repository.getPurchasedCount()
}
function getFollowersCount(repository){
    return repository.getFollowersCount()
}

function createUsers(repository,number, batchSize){
    return repository.createUsers(number,batchSize)
}

function createProduct(repository,number, batchSize){
    return repository.createProduct(number,batchSize)
}


module.exports = {
    getUserCount:getUserCount,
    getProductCount:getProductCount,
    getPurchasedCount:getPurchasedCount,
    getFollowersCount:getFollowersCount,
    createUsers:createUsers,
    createProduct:createProduct
}
