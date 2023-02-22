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

module.exports = {
    getUserCount:getUserCount,
    getProductCount:getProductCount,
    getPurchasedCount:getPurchasedCount,
    getFollowersCount:getFollowersCount
}
