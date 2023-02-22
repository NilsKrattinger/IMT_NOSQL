class updatableElement {
    constructor(ElementId, url, freq) {
        this.element = ElementId;
        this.url = url;
        this.freq = freq;
        this.setUpUpdate()
    }

    async update() {
        let res = await this.fetchData();
        console.log("res :" + res);
        this.element.value = res
    }

    async fetchData() {
        const response = await fetch(this.url);
        return response.json();
    }

    setUpUpdate() {
        const obj = this
        window.addEventListener('load', function () {
            setInterval(obj.fetchData, 10000);
        });
    }
}

const graph = {
    userCount: new updatableElement('graphFollowCount','http://localhost:8080/graph/userCount',10000),
    followerCount: new updatableElement('graphFollowCount','http://localhost:8080/graph/followerCount',10000),
    productCount: new updatableElement('graphProductCount','http://localhost:8080/graph/productCount',10000),
    purchaseCount: new updatableElement('graphPurchaseCount','http://localhost:8080/graph/purchaseCount',10000),
}

const relational = {
    userCount: new updatableElement('graphFollowCount','http://localhost:8080/pg/userCount',10000),
    followerCount: new updatableElement('graphFollowCount','http://localhost:8080/pg/followersCount',10000),
    productCount: new updatableElement('graphProductCount','http://localhost:8080/pg/productCount',10000),
    purchaseCount: new updatableElement('graphPurchaseCount','http://localhost:8080/pg/purchaseCount',10000 ),
}


window.addEventListener('load', function () {
    // Your document is loaded.
    let fetchInterval = 10000; // 0.5 seconds.

    // Invoke the request every 5 seconds.
    //setInterval(update, fetchInterval);
});
