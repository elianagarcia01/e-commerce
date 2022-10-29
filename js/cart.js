URLCART = CART_INFO_URL + "25801" + EXT_TYPE

const table = document.getElementById("table");

let cartInfo

//Function for the input event, change the value of the subtotal
function addAmount(e) {
    let id = e["srcElement"].id
    let span = document.getElementById(`${id}_subtotal`)

    let cost = parseInt(document.getElementById(`${id}_cost`).dataset.value)
    let input = parseInt(document.getElementById(`${id}`).value)
    let result = cost * input

    span.innerHTML = result
    span.dataset.value = result
    costCart()
}

// Displays and calculates cost values ​​in real time
function costCart() {
    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)
    //console.log(buyProductLocal)

    let arraySubtotal = []

    let { articles: [{ id }] } = cartInfo
    inputFirstBuy = parseInt(document.getElementById(`${id}_subtotal`).dataset.value)
    arraySubtotal.push(inputFirstBuy)

    buyProductLocal.forEach(art => {
        input = parseInt(document.getElementById(`${art.id}_subtotal`).dataset.value)
        arraySubtotal.push(input)
    })

    //Subtotal
    let spanSubTCost = document.getElementById(`subTotalCost`)
    let arraySubtotalReduce = arraySubtotal.reduce((a, b) => a + b, 0)

    spanSubTCost.innerHTML = "USD" + arraySubtotalReduce

    //Shipping cost and total
    let spanShippingCost = document.getElementById(`shippingCost`);
    let totalCost = document.getElementById(`totalCost`);

    let costoP = Math.trunc(0.15 * arraySubtotalReduce)
    spanShippingCost.innerHTML = "USD" + costoP
    totalCost.innerHTML = "USD" + (arraySubtotalReduce + costoP)

    document.formCart.buy.forEach(radio => {
        radio.addEventListener('change', () => {
            let premium = document.querySelector('input[id="prem"]:checked');
            let express = document.querySelector('input[id="exp"]:checked');
            let standard = document.querySelector('input[id="sta"]:checked');

            if (premium) {
                let costoP = Math.trunc(0.15 * arraySubtotalReduce)
                spanShippingCost.innerHTML = "USD" + costoP
                totalCost.innerHTML = "USD" + (arraySubtotalReduce + costoP)
            }
            if (express) {
                let costoE = Math.trunc(0.07 * arraySubtotalReduce)
                spanShippingCost.innerHTML = "USD" + costoE
                totalCost.innerHTML = "USD" + (arraySubtotalReduce + costoE)
            }
            if (standard) {
                let costoS = Math.trunc(0.05 * arraySubtotalReduce)
                spanShippingCost.innerHTML = "USD" + costoS
                totalCost.innerHTML = "USD" + (arraySubtotalReduce + costoS)
            }

        })
    });
}

//FUNCTION FOR THE METHOD OF PAYMENT, disable unselected fields- modal
function wayToPay() {
    let tarj = document.querySelector('input[id="tarj"]:checked');
    let trans = document.querySelector('input[id="trans"]:checked');

    let disabledAccountNro = document.getElementById(`accountNro`)
    let collection = document.getElementsByClassName(`card`)
    let paymentSelection = document.getElementById(`paymentSelection`)

    if (tarj) {
        disabledAccountNro.disabled = true;
        for (let i = 0; i < collection.length; i++) {
            collection[i].disabled = false;
            paymentSelection.innerHTML = "Tarjeta de crédito"
        }
    }
    if (trans) {
        disabledAccountNro.disabled = false;
        for (let i = 0; i < collection.length; i++) {
            collection[i].disabled = true;
        }
        paymentSelection.innerHTML = "Transferencia bancaria"
    }
}

tarj.addEventListener("click", wayToPay)
trans.addEventListener("click", wayToPay)

//FUNCTION THAT SHOWS THE CART
function showCart() {
    // I get the localStorage array of the products to buy
    let buyProductLocal = localStorage.getItem('buyProduct')
    buyProductLocal = JSON.parse(buyProductLocal)

    //I destroy the object that is in articles and add it to the html table
    let { articles: [{ name, count, unitCost, currency, image, id }] } = cartInfo

    firstBuy = `
        <tr>
        <th scope="row"></th>
        <td> <img src="${image}" width="80px"></td>
        <td>${name}</td>
        <td >${currency} <span id="${id}_cost" data-value="${unitCost}">${unitCost}</span></td>
        <td><input class="form-control" type="number" min="1" id="${id}" value="${count}" style="width: 60px;"/></td>`

    let result = unitCost * count
    inputValue =
        `<td><b>${currency}<span id="${id}_subtotal" data-value="${result}">${result}</span></b></td>
        </tr>
        `
    table.innerHTML += firstBuy + inputValue

    //go through the array that I brought with the localStorage, the one that contains the products to buy
    let bodyListBuy = ""

    if (buyProductLocal) {
        buyProductLocal.forEach(art => {
            if (art.currency === "UYU") {
                art.currency = "USD"
                art.unitCost = Math.round(art.unitCost / 40)
            }
            bodyListBuy += `
            <tr>
            <th scope="row"></th>
            <td> <img src="${art.image}" width="80px"></td>
            <td>${art.name}</td>
            <td>${art.currency}<span id="${art.id}_cost" data-value="${art.unitCost}">${art.unitCost}</span></td>
            <td><input class="form-control" type="number" min="1" id="${art.id}" value="${art.count}" style="width: 60px;" />
            </td>
        
            <td><b>${art.currency}<span id="${art.id}_subtotal" data-value="${art.unitCost * art.count}">${art.unitCost *
                art.count}</span></b></td>
          </tr>
        `
        })
    }
    table.innerHTML += bodyListBuy
}

// FUNCTION TO VALIDATE THE FORM
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
                    document.getElementById("alert-success").classList.add("show")
                }

                let trans = document.querySelector('input[id="trans"]:checked');
                let card = document.querySelector('input[id="tarj"]:checked');

                let disabledAccountNro = document.getElementById(`accountNro`).value
                let cardID = document.getElementById(`cardID`).value
                let expirationID = document.getElementById(`expirationID`).value
                let codeId = document.getElementById(`codeID`).value

                if ((!card && !trans) || (disabledAccountNro === "") && (cardID === "" || expirationID === "" || codeId === "")) {
                    document.getElementById("btnSelect").className = "btn btn-link is-invalid"

                } else {
                    document.getElementById("btnSelect").className = "btn btn-link is-valid"
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

            //Input event to the first item to buy
            let { articles: [{ id }] } = cartInfo
            inputFirstBuy = document.getElementById(`${id}`);
            inputFirstBuy.addEventListener('input', addAmount)

            //Input event to articles added
            let buyProductLocal = localStorage.getItem('buyProduct')
            buyProductLocal = JSON.parse(buyProductLocal)
            if (buyProductLocal) {
                buyProductLocal.forEach(art => {
                    input = document.getElementById(`${art.id}`);
                    input.addEventListener('input', addAmount);
                })
            }
        }
        costCart()
    });
})