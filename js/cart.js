URLCART = CART_INFO_URL + "25801" + EXT_TYPE
const container = document.getElementById("containerCart")
const table = document.getElementById("table");

let cartInfo



function myFunction() {
    let input = document.getElementById("subtotal")
   // cartInfo.articles.push (2805)
    //console.log(cartInfo.articles)
    cartInfo.articles.forEach(art => {
        let result = art.unitCost * input.value
        //console.log(result)
        let tdB = document.getElementById("tdB")
        tdB.innerHTML = art.currency + result
    })
}

function showCart() {
    cartInfo.articles.forEach(art => {
        bodyInfo = `
        <tr>
        <th scope="row"></th>
        <td> <img src="${art.image}" width="70px"</td>
        <td>${art.name}</td>
        <td>${art.currency}${art.unitCost}</td>
        <td><input class="form-control" type="number" id="subtotal" value="${art.count}" style="width: 60px;"/></td>`

        inputValue =
            `<td ><b id="tdB">${art.currency}${art.unitCost * art.count}</b></td>
        </tr>
        `
    })

    table.innerHTML += bodyInfo + inputValue

     input = document.querySelector('input');
    input.addEventListener('input', myFunction)
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