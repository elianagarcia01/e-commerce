// variable que accede al catID del local storage para cargar las distinas categorias
var nroId= localStorage.getItem("catID")

//Se referencia el origen de los datos en formato Json
const url="https://japceibal.github.io/emercado-api/cats_products/" +nroId +".json"

function nombreCat(){
    switch(nroId){
case"101": 
    document.getElementById("nameCat").innerHTML="Autos";
    break;
case"102": 
    document.getElementById("nameCat").innerHTML="Juguetes";
    break;
case"103": 
    document.getElementById("nameCat").innerHTML="Muebles";
    break;
case"104": 
    document.getElementById("nameCat").innerHTML="Herramientas"; 
    break;
case"105": 
    document.getElementById("nameCat").innerHTML="Computadoras";
    break;
case"106": 
    document.getElementById("nameCat").innerHTML="Vestimenta";
    break;
case"107": 
    document.getElementById("nameCat").innerHTML="Electrodomésticos";
    break;
case"108": 
    document.getElementById("nameCat").innerHTML="Deporte";
    break;
case"109": 
    document.getElementById("nameCat").innerHTML="Celulares";
}
}

nombreCat()
//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos
function showProductsList(data) {
   // console.log(data)
    let body=""; 
   // console.log(data["products"].length)
    data["products"].forEach(products => { 
       //console.log(products)
        body+=`
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
        `
       
    });
    
    document.getElementById("data").innerHTML = body;
   // console.log(body)
    }

 
    document.addEventListener("DOMContentLoaded", function(e){
        fetch(url) 
        .then(response => response.json())
        .then(data => {
            return showProductsList(data);
        })
        .catch(error => console.log(error))
    });