URLCART = CART_INFO_URL + "25801" + EXT_TYPE
const container = document.getElementById("containerCart")
const table = document.getElementById("table");

let cartInfo

//Función para el evento input, cambia el valor del subtotal
function addAmount() {
    let span = document.getElementById("spanResult")

    let { articles: [{ unitCost, id }] } = cartInfo

    let input = document.getElementById(`${id}`)
    let result = unitCost * input.value
    span.innerHTML = result
}

function showCart() {
    // Obtengo el objeto del local storage del producto a comprar y lo push al array de articulos

    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)
    cartInfo.articles.push(buyProductLocal)
    console.log(cartInfo.articles)

    let bodyInfo = ""
    cartInfo.articles.forEach(art => {
        bodyInfo += `
        <tr>
        <th scope="row"></th>
        <td> <img src="${art.image}" width="80px"</td>
        <td>${art.name}</td>
        <td>${art.currency}${art.unitCost}</td>
        <td><input class="form-control" type="number" id="${art.id}" value="${art.count}" style="width: 60px;"/></td>`

        let result = art.unitCost * art.count
        inputValue =
            `<td><b>${art.currency}<span id="spanResult">${result}</span></b></td>
        </tr>
        `
    })

    table.innerHTML += bodyInfo + inputValue

    input = document.querySelector('input');
    input.addEventListener('input', addAmount)
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URLCART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data
            showCart()
        }
    });
})