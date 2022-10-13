let nroId = localStorage.getItem("InfoProdID")

const urlInfo = PRODUCT_INFO_URL + nroId + EXT_TYPE
const urlInfoCom = PRODUCT_INFO_COMMENTS_URL + nroId + EXT_TYPE

const resultadoInfo = document.querySelector("#dataInfo")
const resultadoComents = document.querySelector("#dataComents")
const resultadoRelated = document.querySelector("#dataRelated")


function setRelatedID(id) {
    localStorage.setItem("InfoProdID", id);
    window.location = "product-info.html"
}

let productsInfo
let productNew = [];

//Función para el boton de comprar, agrega el objeto del producto al local storage 
function buyProduct(id) {
    alert("Agregado al carrito")
    let valueI

    if (localStorage.getItem('buyProduct') !== null) {
        valorI = localStorage.getItem('buyProduct')
        valorI = JSON.parse(valorI)

        console.log(valorI)
    } else {
        valorI = []
    }

    let { name, cost, currency, images } = productsInfo;
    let objetBuy = {
        id: id,
        name: name,
        count: 1,
        unitCost: cost,
        currency: currency,
        image: images[0]
    }
    valorI.push(objetBuy)
    valorI = JSON.stringify(valorI)

    localStorage.setItem(`buyProduct`, valorI);
    //console.log(valorI)
}

function showProductsInfo() {
    bodyInfo = `
           <br>
           <div class=" d-flex justify-content-between">
           <h3>${productsInfo.name} </h3>
           <button type="button" class="btn btn-success" onclick="buyProduct(${productsInfo.id})">Comprar</button>
           </div>
           <hr>
           <b> Precio </b>
           <p>${productsInfo.currency} ${productsInfo.cost} </p>
           <b> Descripción </b>
           <p>${productsInfo.description} </p>
           <b> Categoria </b>
           <p>${productsInfo.category} </p>
           <b>Cantidad de vendidos </b>
           <p>${productsInfo.soldCount} </p> 
           <b> Imágenes ilustrativas </b> <br>
           `

    let divImg = `<div id="carouselImg" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-inner">
<div class="carousel-item active">
  <img src="${productsInfo.images[0]}" alt="product image" class="d-block w-100">  
  </div>

  `
    productsInfo.images.shift()
    productsInfo.images.forEach(imagen => {
        divImg +=
            `<div class="carousel-item ">
           <img src="${imagen}" alt="product image" class="d-block w-100">
           </div>
           `
    })
    divImg += `
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselImg" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselImg" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `
    resultadoInfo.innerHTML = bodyInfo + divImg;

    //PRODUCTOS RELACIONADOS
    let bodyRelated = `
    <hr>
    <h4>Productos relacionados</h4> <br>
    <div class="row-3"  style= "display:flex ; gap:14px;  flex-wrap: wrap;">`
    productsInfo.relatedProducts.forEach(related => {

        bodyRelated += `
            <div onclick="setRelatedID(${related.id})" class="cursor-active" >
            <img src="${related.image}" alt="product image" class="img-thumbnail" width="316px">  
            <h5>${related.name}</h5>
            </div>
            `
    })

    bodyRelated += `</div>`
    resultadoRelated.innerHTML = bodyRelated
}

let coments = [];
function showComents() {

    //Ordena los comentarios por fechas
    coments.sort((a, b) => {
        if (a.dateTime > b.dateTime) return -1;
        if (a.dateTime > b.dateTime) return 1;
        return 0;
    })

    bodyCom = ""

    bodyCom += `<br> <h4>Comentarios</h4>
    <div id="newComent"></div>
    `

    coments.forEach(com => {
        let score = 5 - com.score

        bodyCom += `
        <div class="list-group-item">

        <p> <b>${com.user + "</b> - " + com.dateTime + " -"}  
        ${`<span class="fa fa-star checked"></span>`.repeat(com.score) +
            `<span class="fa-regular fa-star"></span>`.repeat(score)}
        </p>
        <p>
        ${com.description} 
        </p>
        </div>
        `
    })
    resultadoComents.innerHTML = bodyCom;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsInfo = resultObj.data
            //console.log(productsInfo)
            showProductsInfo()
        }
    });
})

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlInfoCom).then(function (resultObj) {
        if (resultObj.status === "ok") {
            coments = resultObj.data
            //console.log(coments)
            showComents()
        }
    });
})



review = document.getElementById("review");
enviar = document.getElementById("enviar");


//FECHA
var today = new Date();
var now = today.toLocaleString("af-ZA");


function addComent() {

    //ESTRELLAS
    const newComentContainer = document.getElementById("newComent");
    const select = document.getElementById("select");
    const option = select.options[select.selectedIndex];
    const scoreReview = 5 - option.text

    localStorage.setItem("review", review.value);

    newComentContainer.innerHTML += `
    <div class="list-group-item">
    <p> <b>${localStorage.getItem("user") + "</b> - " + now + " -"}  
        ${`<span class="fa fa-star checked"></span>`.repeat(option.text) +
        `<span class="fa-regular fa-star"></span>`.repeat(scoreReview)}
            
        </p>
        <p>
        ${localStorage.getItem("review")}
        </p>
        </div>
    `;
    review.value = "";
}

enviar.addEventListener("click", addComent)
