//Se referencia el origen de los datos en formato Json
const url="https://japceibal.github.io/emercado-api/cats_products/101.json"

//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos
function showProductsList(data) {
    console.log(data)
    let body=""; 
    console.log(data["products"].length)
    data["products"].forEach(products => { 
       console.log(products)
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
    console.log(body)
    }

 
    document.addEventListener("DOMContentLoaded", function(e){
        fetch(url) 
        .then(response => response.json())
        .then(data => {
            return showProductsList(data);
        })
        .catch(error => console.log(error))
    });