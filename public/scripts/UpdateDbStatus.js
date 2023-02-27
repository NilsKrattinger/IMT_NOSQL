class updatableElement {
    constructor(ElementId, url, freq) {
        this.element = document.getElementById(ElementId);
        this.url = url;
        this.freq = freq;
        this.setUpUpdate(this)
        this.update(this)
    }

    async update(obj) {
        obj.element.innerHTML = await obj.fetchData(obj)
    }

    async fetchData(obj) {
        const response = await fetch(obj.url);
        if (response.ok) {
        const responseObj = await response.json()

            return responseObj.Data[0].count;
        }
    }

    setUpUpdate(obj) {
        window.addEventListener('load', function () {
            setInterval(() => {
                obj.update(obj)
            }, obj.freq);
        });
    }
}




const graph = {
    userCount: new updatableElement('graphUserCount', 'http://localhost:8080/graph/userCount', 1000),
    followerCount: new updatableElement('graphFollowCount', 'http://localhost:8080/graph/followersCount', 1000),
    productCount: new updatableElement('graphProductCount', 'http://localhost:8080/graph/productCount', 1000),
    purchaseCount: new updatableElement('graphPurchaseCount', 'http://localhost:8080/graph/purchaseCount', 1000),
}

const relational = {
    userCount: new updatableElement('relationalUserCount', 'http://localhost:8080/pg/userCount', 1000),
    followerCount: new updatableElement('relationalFollowCount', 'http://localhost:8080/pg/followersCount', 1000),
    productCount: new updatableElement('relationalProductCount', 'http://localhost:8080/pg/productCount', 1000),
    purchaseCount: new updatableElement('relationalPurchaseCount', 'http://localhost:8080/pg/purchaseCount', 1000),
}
