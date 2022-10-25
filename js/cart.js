URLCART = CART_INFO_URL + "25801" + EXT_TYPE

const table = document.getElementById("table");

let cartInfo

let spanSubTCost = document.getElementById(`subTotalCost`)

//Función para el evento input, cambia el valor del subtotal
function addAmount(e) {
    let id = e["srcElement"].id

    let span = document.getElementById(`${id}_subtotal`)
    //let { articles: [{ unitCost }] } = cartInfo
    let costo = parseInt(document.getElementById(`${id}_cost`).dataset.value)
    let input = parseInt(document.getElementById(`${id}`).value)
    let result = costo * input
    span.innerHTML = result
    costs()
}


function costs() {
    //Subtotal
    let { articles: [{ unitCost, currency }] } = cartInfo
    let spanSubTCost = document.getElementById(`subTotalCost`)

    let result = unitCost * input.value
    spanSubTCost.innerHTML = currency + result


    document.formCart.compra.forEach(radio => {
        radio.addEventListener('change', () => {

            //Costo de envio y total
            let spanEnvioCost = document.getElementById(`costoEnvio`);
            let totalCost = document.getElementById(`totalCost`);

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

        })
    });
}

//FORMA DE PAGO
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

//MUESTRA EL CARRITO
function showCart() {
    // Obtengo el array del localStorage de los productos a comprar 
    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)
    // console.log(buyProductLocal)

    //Destructuro el objeto que esta en articles y lo agrego a la tabla html
    let { articles: [{ name, count, unitCost, currency, image, id }] } = cartInfo

    firstBuy = `
        <tr>
        <th scope="row"></th>
        <td> <img src="${image}" width="80px"</td>
        <td>${name}</td>
        <td >${currency} <span id="${id}_cost" data-value="${unitCost}">${unitCost}</span></td>
        <td><input class="form-control" type="number" min="1" id="${id}" value="${count}" style="width: 60px;"/></td>`

    let result = unitCost * count
    inputValue =
        `<td><b>${currency}<span id="${id}_subtotal">${result}</span></b></td>
        </tr>
        `
    table.innerHTML += firstBuy + inputValue

    //costs()
    spanSubTCost.innerHTML = currency + result
    //Recorro el array que traje con el localStorage, el que contiene los productos a comprar
    let bodyListBuy = ""
    buyProductLocal.forEach(art => {
        bodyListBuy += `
        <tr>
        <th scope="row"></th>
        <td> <img src="${art.image}" width="80px"</td>
        <td>${art.name}</td>
        <td>${art.currency}<span id="${art.id}_cost" data-value="${art.unitCost}">${art.unitCost}</span></td>
        <td><input class="form-control" type="number" min="1" id="${art.id}" value="${art.count}" style="width: 60px;"/></td>

        <td><b>${art.currency}<span id="${art.id}_subtotal">${art.unitCost * art.count}</span></b></td>
        </tr>
        `
    })
    table.innerHTML += bodyListBuy
}

//ALERTA EXITOSA
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}


// FUNCION PARA VALIDAR EL FORM
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
                else {
                    showAlertSuccess()
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
            input = document.getElementById(`50924`);
            input.addEventListener('input', addAmount);
            
            input = document.getElementById(`50921`);
            input.addEventListener('input', addAmount);

            input = document.getElementById(`50922`);
            input.addEventListener('input', addAmount);

        }
    });
})