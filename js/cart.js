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
    costos()
}

function costos() {

    //Subtotal
    let { articles: [{ unitCost, currency }] } = cartInfo
    let spanSubTCost = document.getElementById(`subTotalCost`)

    let result = unitCost * input.value
    spanSubTCost.innerHTML = currency + result

    //Costo de envio y total
    let spanEnvioCost = document.getElementById(`costoEnvio`)
    let totalCost = document.getElementById(`totalCost`)

    let premium = document.querySelector('input[id="prem"]:checked');
    let express = document.querySelector('input[id="exp"]:checked');
    let standard = document.querySelector('input[id="sta"]:checked');

    if (premium) {
        let costoP = Math.trunc(0.15 * result)
        spanEnvioCost.innerHTML = currency + costoP
        totalCost.innerHTML = currency + (result + costoP)
    }
    if (express) {
        let costoE = Math.trunc(0.07 * result)
        spanEnvioCost.innerHTML = currency + costoE
        totalCost.innerHTML = currency + (result + costoE)
    }
    if (standard) {
        let costoS = Math.trunc(0.05 * result)
        spanEnvioCost.innerHTML = currency + costoS
        totalCost.innerHTML = currency + (result + costoS)
    }
}

function wayToPay() {
    let tarj = document.querySelector('input[id="tarj"]:checked');
    let trans = document.querySelector('input[id="trans"]:checked');

    let nroCuentaDisabled = document.getElementById(`nroCuenta`)
    let collection = document.getElementsByClassName(`tarjeta`)

    let seleccionPago = document.getElementById(`seleccionPago`)

    if (tarj) {
        nroCuentaDisabled.disabled = true;
        for (let i = 0; i < collection.length; i++) {
            collection[i].disabled = false;
            seleccionPago.innerHTML = "Tarjeta de crédito"

        }
    }
    if (trans) {
        nroCuentaDisabled.disabled = false;
        for (let i = 0; i < collection.length; i++) {
            collection[i].disabled = true;
        }
        seleccionPago.innerHTML = "Transferencia bancaria"
    }
}

tarj.addEventListener("click", wayToPay)
trans.addEventListener("click", wayToPay)

function showCart() {
    // Obtengo el array del localStorage de los productos a comprar 
    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)
    // console.log(buyProductLocal)


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
    table.innerHTML += firstBuy + inputValue

    input = document.querySelector('input');
    input.addEventListener('input', addAmount)

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
}
// Debe seleccionar una forma de pago
// función para validar el form
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URLCART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data
            showCart()
        }
    });
})