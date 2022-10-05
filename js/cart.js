URLCART = CART_INFO_URL + "25801" + EXT_TYPE
const container = document.getElementById("containerCart")
const table = document.getElementById("table");

let cartInfo

function myFunction() {
    let input= document.getElementById("subtotal").value;
    cartInfo.articles.forEach(art => {
       let result= art.unitCost* input
       console.log(result)
       let td= document.getElementById("td")
       td.innerHTML=art.currency + result
    })
     
}

function showCart() {
    cartInfo.articles.forEach(art => {
        bodyInfo = `
        <tr>
        <td> <img src="${art.image}" width="130px"</td>
        <td>${art.name}</td>
        <td>${art.currency}${art.unitCost}</td>
        <td><input onchange="myFunction()"type="number" id="subtotal" value="${art.count}" style="width: 60px;"/></td>`
        
        inputValue=
        `<td id="td">${art.currency}${art.unitCost*art.count}</td>
        </tr>
        `
    })

    table.innerHTML += bodyInfo+inputValue
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