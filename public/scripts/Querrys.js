const Elements = {
    btn_query_1: document.getElementById('request1'),
    btn_query_2: document.getElementById('request2'),
    btn_query_3: document.getElementById('request3'),
    btn_add_user: document.getElementById('AddUsers'),
    btn_add_product: document.getElementById('AddProduct'),
    btn_delete_all: document.getElementById('DeleteAll'),
    btn_random_user: document.getElementById('RandomUserID'),
    btn_random_product: document.getElementById('RandomProductID'),
    field_userIDGraph: document.getElementById('GraphUserId'),
    field_userIDRelational: document.getElementById('RelationalUserId'),
    field_productIdGraph: document.getElementById('GraphProductId'),
    field_productIdRelational: document.getElementById('RelationalProductId'),
    field_batchSize: document.getElementById('batchSize'),
    field_inputNumber: document.getElementById('NumberToInsert'),
    graph_queryTime: document.getElementById('GraphResponseTime'),

}

const tableDetails = {
    'pg-table': {
        'color': '#27b1be',
        'time': document.getElementById('RelationalResponseTime')
    },
    'gaph-table': {
        'color': '#d9ae0d',
        'time': document.getElementById('GraphResponseTime')
    },
}

function isNumber(value) {
    if (typeof value === "string" && value.length) {
        return !isNaN(value);
    }
    return false
}


async function onClickBtnRequest1() {

    const userIDRelational = Elements.field_userIDRelational.value.toString()
    const userIdGraph = Elements.field_userIDGraph.value.toString()

    if (!isNumber(userIDRelational) || !isNumber(userIdGraph)) {
        alert('UserId are not numbers')
        return
    }


    let resPg = await fetch('http://localhost:8080/pg/productSalesFromNetwork/' + userIdGraph).then((res) => {
        updateTable('pg-table', res)
    });
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/' + userIdGraph).then((res) => {
        updateTable('graph-table', res)

    });
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest2() {
    const userIDRelational = Elements.field_userIDRelational.value.toString()
    const userIdGraph = Elements.field_userIDGraph.value.toString()
    const productIdRelational = Elements.field_productIdRelational.value.toString()
    const productIdGraph = Elements.field_productIdGraph.value.toString()


    if (!isNumber(userIDRelational) || !isNumber(userIdGraph)) {
        alert('UserId are not numbers')
        return
    }

    if (!isNumber(productIdRelational) || !isNumber(productIdGraph)) {
        alert('ProductId are not Number');
        return
    }


    let resPg = fetch('http://localhost:8080/pg/specificProductSaleFromNetwork/' + userIDRelational + '/' + productIdRelational).then((res) => {
        updateTable('pg-table', res)

    });
    let resGraph = fetch('http://localhost:8080/graph/productSalesFromNetwork/' + userIdGraph + '/' + productIdGraph).then((res) => {
        updateTable('graph-table', res)
    });
    await Promise.all([resPg, resGraph])
}

async function onClickBtnRequest3() {
    const productIdRelational = Elements.field_productIdRelational.value.toString()
    const productIdGraph = Elements.field_productIdGraph.value.toString()


    if (!isNumber(productIdRelational) || !isNumber(productIdGraph)) {
        alert('ProductId are not Number');
        return
    }


    let resPg = fetch('http://localhost:8080/pg/productVirality/' + productIdRelational).then((res) => {
        updateTable('pg-table', res)
    });
    let resGraph = fetch('http://localhost:8080/graph/productVirality/' + productIdGraph).then((res) => {
        updateTable('graph-table', res)
    });
    await Promise.all([resPg, resGraph])
}

async function updateTable(tableId, data) {


    console.log("In updateTable : " + data)
    const jsonData = await data.json()
    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead');
    thead.style.backgroundColor = tableDetails[tableId].color
    tableDetails[tableId].time.innerHTML = "Duration : " + jsonData.Duration + " (ms)"

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


Elements.btn_query_1.addEventListener('click', onClickBtnRequest1)
Elements.btn_query_2.addEventListener('click', onClickBtnRequest2)
Elements.btn_query_3.addEventListener('click', onClickBtnRequest3)
