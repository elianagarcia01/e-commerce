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
    let divImg = `<div class="row-3"  style= "display:flex ; gap:15px">`

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
    bodyCom = ""

    bodyCom += `<br> <h4>Comentarios</h4>`

    coments.forEach(com => {
        let score = 5 - com.score

        bodyCom += `
        <div class="list-group-item ">

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
    bodyCom +=
        `<div>
        <form action="">
        <br>
          <h4>Comentar</h4>
          <p>Tu opinión:</p>
          <textarea id="review" rows="4" cols="50">
          </textarea>
          <br>
          <p>Tu puntuación:<br> 
            <select name="select" style="width: 150px">
              <option> 1</option>
              <option> 2</option>
              <option> 3</option>
              <option> 4</option>
              <option> 5</option>
            </select></p> 
          <button class="w-10 btn btn-sm btn-primary">Enviar</button>
        </form>
      </div>
        `
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
            //console.log(productsInfo)
            showComents()
        }
    });
})