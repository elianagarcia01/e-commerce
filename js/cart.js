URLCART = CART_INFO_URL + "25801" + EXT_TYPE

const table = document.getElementById("table");

let cartInfo

//Función para el evento input, cambia el valor del subtotal
function addAmount() {

    let span = document.getElementById("spanResult")

    let { articles: [{ unitCost }] } = cartInfo

    let input = document.getElementById(`subtotal`)
    let result = unitCost * input.value
    span.innerHTML = result
}



function showCart() {
    // Obtengo el array del localStorage de los productos a comprar 
    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)
    console.log(buyProductLocal)


    //Destructuro el objeto que esta en articles y lo agrego a la tabla html
    let { articles: [{ name, count, unitCost, currency, image }] } = cartInfo
    
    firstBuy = `
        <tr>
        <th scope="row"></th>
        <td> <img src="${image}" width="80px"</td>
        <td>${name}</td>
        <td>${currency}${unitCost}</td>
        <td><input class="form-control" type="number" id="subtotal" value="${count}" style="width: 60px;"/></td>`

    let result = unitCost * count
    inputValue =
        `<td><b>${currency}<span id="spanResult">${result}</span></b></td>
        </tr>
        `
    table.innerHTML +=  firstBuy + inputValue
    

    //Recorro el array que traje con el localStorage, el que contiene los productos a comprar
    let bodyListBuy = ""
    buyProductLocal.forEach(art => {
        bodyListBuy += `
        <tr>
        <th scope="row"></th>
        <td> <img src="${art.image}" width="80px"</td>
        <td>${art.name}</td>
        <td>${art.currency}${art.unitCost}</td>
        <td><input class="form-control" type="number" id="subtotal" value="${art.count}" style="width: 60px;"/></td>

        <td><b>${art.currency}<span id="spanResult">${art.unitCost * art.count}</span></b></td>
        </tr>
        `
      console.log(art.image)  
    })

    table.innerHTML += bodyListBuy

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