class updatableElement {
    constructor(ElementId, url, freq,base) {
        this.element = document.getElementById(ElementId);
        this.url = url;
        this.freq = freq;
        this.base = base;
        this.setUpUpdate()
        this.update(this)
    }

    async update(obj) {
        obj.element.innerHTML = obj.base + await obj.fetchData(obj)
    }

    async fetchData(obj) {
        const response = await fetch(obj.url);
        const responseObj = await response.json()
        return responseObj.Data.rows[0].count;

    }

    setUpUpdate() {
        const obj = this
        window.addEventListener('load', function () {
            setInterval( () =>{obj.update(obj)}, 10000);
        });
    }
}
const btn = {
    request1 : document.getElementById('request1'),
    request2 : document.getElementById('request2'),
    request3 : document.getElementById('request3'),
    addUser : document.getElementById('AddUsers'),
    addProduct : document.getElementById('AddProduct'),
    DeleteAll : document.getElementById('DeleteAll'),
}

const graph = {
    userCount: new updatableElement('graphUserCount','http://localhost:8080/graph/userCount',10000, "Users : "),
    followerCount: new updatableElement('graphFollowCount','http://localhost:8080/graph/followerCount',10000,"Followers : "),
    productCount: new updatableElement('graphProduceCount','http://localhost:8080/graph/productCount',10000,"Products : "),
    purchaseCount: new updatableElement('graphPurchasesCount','http://localhost:8080/graph/purchaseCount',10000,"Purchases : "),
}

const relational = {
    userCount: new updatableElement('relationalUserCount','http://localhost:8080/pg/userCount',10000,"Users : "),
    followerCount: new updatableElement('relationalFollowCount','http://localhost:8080/pg/followersCount',10000,"Followers : "),
    productCount: new updatableElement('relationalProductCount','http://localhost:8080/pg/productCount',10000,"Products : "),
    purchaseCount: new updatableElement('relationalPurchaseCount','http://localhost:8080/pg/purchaseCount',10000,"Purchases : "),
}


btn.request1.addEventListener('click',onClickBtnRequest1)
btn.request2.addEventListener('click',onClickBtnRequest2)
btn.request3.addEventListener('click',onClickBtnRequest3)


async function onClickBtnRequest1() {
    let resPg = fetch('http://localhost:8080/pg/productSalesFromNetwork/1').then(updatePgArray);
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/1').then(updateGraphArray);
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest2() {
    let resPg = fetch('http://localhost:8080/pg/specificProductSaleFromNetwork/1/1').then(updatePgArray);
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/1/1').then(updateGraphArray);
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest3() {
    let resPg = fetch('http://localhost:8080/pg/productVirality').then(updatePgArray);
    let resGraph = fetch('http://localhost:8080/graph/productVirality').then(updateGraphArray);
    await Promise.all([resPg, resGraph])
}

async function updatePgArray(value) {
    const rep = value.json()
    console.log("Pg array : " + rep)
}

function updateGraphArray(res){
    console.log("Graph array : " + res)

}

