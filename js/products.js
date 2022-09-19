// variable que accede al catID del local storage para cargar las distinas categorias
let nroId = localStorage.getItem("catID")
//Se referencia el origen de los datos en formato Json
const url = "https://japceibal.github.io/emercado-api/cats_products/" + nroId + ".json"
const nameCat= document.getElementById("nameCat")

const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_SOLD_COUNT = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//Funcion que utiliza un id de un producto. 
//lo que hace es guardar el id en el localstorage y redireccionar al html de info
function setProdID(id) {
    localStorage.setItem("InfoProdID", id);
    window.location = "product-info.html"
}

// traigo el input del buscador
const buscadora = document.querySelector("#buscador");
const resultado = document.querySelector("#data")

//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos
function showProductsList() {
    let body = "";

    currentProductsArray.forEach(products => {

        //datos para el buscador
        const text = buscadora.value.toLowerCase();
        let name = products.name.toLowerCase();
        let description = products.description.toLowerCase();
        let logicSearch = name.indexOf(text) !== -1 || description.indexOf(text) !== -1

        let logicMinCount = (minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)
        let logicMaxCount = (maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount)

        if (logicMinCount && logicMaxCount && logicSearch) {
            body += `
         <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
             <div class="row">
                 <div class="col-3">
                     <img src="${products.image}" alt="product image" class="img-thumbnail">
                 </div>
                 <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                         <div class="mb-1">
                         <h4>${products.name + " - " + products.currency + products.cost}</h4> 
                         <p> ${products.description}</p> 
                         </div>
                         <small class="text-muted"> ${products.soldCount}  vendidos</small> 
                     </div>
 
                 </div>
             </div>
         </div>
         </div>
         `
        }

    });
    resultado.innerHTML = body;
    // console.log(body)
}

// funcion que va a ser utilizada para el input del buscador
const searchProduct = () => {
    //console.log(buscadora.value);
    showProductsList()
    if (resultado.innerHTML === "") {
        resultado.innerHTML = `
             Producto no encontrado...
             `
    }
}

//cada vez que se escriba algo en el input, se ejecuta el evento keyup, utilizando la funcion searchProduct
buscadora.addEventListener("keyup", searchProduct)
//searchProduct()

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList(currentProductsArray);
    //console.log(currentProductsArray)
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            nameCat.innerHTML= `${data.catName}`
            currentProductsArray = data["products"]
            return showProductsList();
        })
        .catch(error => console.log(error))


    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio 
        //de los productos 
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        console.log(minCount)
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
});