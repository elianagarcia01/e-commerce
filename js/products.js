let url="https://japceibal.github.io/emercado-api/cats_products/101.json"
fetch(url)
.then(response => response.json())
.then(data => mostrarData(data))
.catch(error => console.log(error))

const mostrarData= (data)=> {
    console.log(data)
    let body="";
    for(let i=0; i<data.length; i++){
        let category= data[i];
        body+=`
        <div class="row"> 
        </div>
        `
    }
    document.getElementById("data").innerHTML = body
    }
 