URLCART = CART_INFO_URL + "25801" + EXT_TYPE
const container = document.getElementById("containerCart")
const table = document.getElementById("table");

let cartInfo

function showCart() {

    cartInfo.articles.forEach(art => {
        bodyInfo = `
        <tr>
        <td> <img src="${art.image}" width="130px"</td>
        <td>${art.name}</td>
        <td>${art.currency}${art.unitCost}</td>
        <td><input type="number" id="subtotal" value="${art.count}" style="width: 60px;"/></td>
        <td>${art.currency}${art.unitCost*art.count }</td>
        </tr>
        `
    })

    table.innerHTML += bodyInfo
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URLCART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data
            //console.log(productsInfo)
            showCart()
        }
    });
})