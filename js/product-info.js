let nroId = localStorage.getItem("InfoProdID")

const urlInfo = PRODUCT_INFO_URL + nroId + EXT_TYPE
const urlInfoCom = PRODUCT_INFO_COMMENTS_URL + nroId + EXT_TYPE

const resultadoInfo = document.querySelector("#dataInfo")
const resultadoComents = document.querySelector("#dataComents")

let productsInfo

function showProductsInfo() {
    bodyInfo = `
           <br>
           <h3>${productsInfo.name} </h3>
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
    let divImg = `<div class="row-3"  style= "display:flex ; gap:14px;  flex-wrap: wrap;">`

    productsInfo.images.forEach(imagen => {
        divImg +=
            `
           <img src="${imagen}" alt="product image" class="img-thumbnail" width="316px">
           `
    })
    divImg += `</div>`

    resultadoInfo.innerHTML = bodyInfo + divImg;
}

let coments = [];
function showComents() {

    //Ordena los comentarios por fechas
    coments.sort((a,b)=>{
        if (a.dateTime > b.dateTime) return -1;
        if (a.dateTime > b.dateTime) return 1;
        return 0;
    })
      
    bodyCom = ""

    bodyCom += `<br> <h4>Comentarios</h4>`

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


//DESAFIATE


review = document.getElementById("review");
enviar = document.getElementById("enviar");


//FECHA
var today = new Date();
var now = today.toLocaleString();

function addComent() {

//ESTRELLAS
const select = document.getElementById("select");
const option = select.options[select.selectedIndex];
const scoreReview = 5 - option.text

    localStorage.setItem("review", review.value);

    resultadoComents.innerHTML += `
    <div class="list-group-item">
    <p> <b>${localStorage.getItem("email") + "</b> - " + now + " -"}  
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

enviar.addEventListener("click",addComent)













/*
review = document.getElementById("review");
enviar = document.getElementById("enviar");
contenedor = document.getElementById("newComentContainer");



let newComent = [];
const coment = JSON.parse(localStorage.getItem("itemComent"));

if (coment !== null) {
    newComent = coment
}


if (newComent.length > 0) {
    for (let i = 0; i < newComent.length; i++) {
        contenedor.innerHTML += `<div class="list-group-item">${coment[i]}</div>`;
    }
}


enviar.addEventListener("click", (evt) => {
    newComent.push(review.value);
    localStorage.setItem("itemComent", JSON.stringify(newComent));
    if (review.value) {
        localStorage.setItem("item", item.value);
        contenedor.innerHTML += `
        
        <div class="list-group-item">
        ${localStorage.getItem("item")}
        </div>`;
        review.value = "";
    }
});

*/

