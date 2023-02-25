class updatableElement {
    constructor(ElementId, url, freq) {
        this.element = document.getElementById(ElementId);
        this.url = url;
        this.freq = freq;
        this.setUpUpdate()
        this.update(this)
    }

    async update(obj) {
        obj.element.innerHTML = await obj.fetchData(obj)
    }

    async fetchData(obj) {
        const response = await fetch(obj.url);
        const responseObj = await response.json()
        return responseObj.Data[0].count;

    }

    setUpUpdate() {
        const obj = this
        window.addEventListener('load', function () {
            setInterval(() => {
                obj.update(obj)
            }, 10000);
        });
    }
}

const btn = {
    request1: document.getElementById('request1'),
    request2: document.getElementById('request2'),
    request3: document.getElementById('request3'),
    addUser: document.getElementById('AddUsers'),
    addProduct: document.getElementById('AddProduct'),
    DeleteAll: document.getElementById('DeleteAll'),
}

const graph = {
    userCount: new updatableElement('graphUserCount', 'http://localhost:8080/graph/userCount', 10000),
    followerCount: new updatableElement('graphFollowCount', 'http://localhost:8080/graph/followerCount', 10000),
    productCount: new updatableElement('graphProduceCount', 'http://localhost:8080/graph/productCount', 10000),
    purchaseCount: new updatableElement('graphPurchasesCount', 'http://localhost:8080/graph/purchaseCount', 10000),
}

const relational = {
    userCount: new updatableElement('relationalUserCount', 'http://localhost:8080/pg/userCount', 10000),
    followerCount: new updatableElement('relationalFollowCount', 'http://localhost:8080/pg/followersCount', 10000),
    productCount: new updatableElement('relationalProductCount', 'http://localhost:8080/pg/productCount', 10000),
    purchaseCount: new updatableElement('relationalPurchaseCount', 'http://localhost:8080/pg/purchaseCount', 10000),
}


btn.request1.addEventListener('click', onClickBtnRequest1)
btn.request2.addEventListener('click', onClickBtnRequest2)
btn.request3.addEventListener('click', onClickBtnRequest3)


async function onClickBtnRequest1() {
    let resPg = await fetch('http://localhost:8080/pg/productSalesFromNetwork/1').then((res) => {
        updateTable('pg-table', res)
    });
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/1').then((res) => {
      updateTable('graph-table', res)

    });
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest2() {
    let resPg = fetch('http://localhost:8080/pg/specificProductSaleFromNetwork/1/1').then((res) => {
        updateTable('pg-table', res)

    });
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/1/1').then((res) => {
        updateTable('graph-table', res)
    });;
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest3() {
    let resPg = fetch('http://localhost:8080/pg/productVirality').then((res) => {
        updateTable('pg-table', res)
    });
    let resGraph = fetch('http://localhost:8080/graph/productVirality').then((res) => {
        updateTable('graph-table', res)
    });
    await Promise.all([resPg, resGraph])
}

async function updatePgArray(value) {
    const rep = value.json()
    console.log("Pg array : " + rep)
}

function updateGraphArray(res) {
    console.log("Graph array : " + res)

}



async function updateTable(tableId, data) {
    const color = {
        'pg-table' : '#27b1be',
        'gaph-table' : '#d9ae0d'
    }

    console.log("In updateTable : " + data)
    const jsonData = await data.json()
    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead');
    thead.style.backgroundColor = color[tableId]
    const tbody = table.querySelector('tbody');
    // Clear the table header and body
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Create table header
    const headerRow = document.createElement('tr');
    console.log(JSON.stringify(jsonData))
    Object.keys(jsonData.Data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    jsonData.Data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

