let firstSurname = document.getElementById("firstSurname");
let firstName = document.getElementById("firstName");
let telephone = document.getElementById("telephone");
let secondName = document.getElementById("secondName");
let secondSurname = document.getElementById("secondSurname");
let usuario = {};

let formProfile = document.getElementById("myProfile");
formProfile.addEventListener("submit", function (e) {

    firstName.classList.remove('is-invalid');
    if (firstName.value === "") {
        firstName.classList.add('is-invalid');
        e.preventDefault();
    }

    firstSurname.classList.remove('is-invalid');
    if (firstSurname.value === "") {
        firstSurname.classList.add('is-invalid');
        e.preventDefault();
    }

    telephone.classList.remove('is-invalid');
    if (telephone.value === "") {
        telephone.classList.add('is-invalid');
        e.preventDefault();
    }

    if ((firstName.value) && (firstSurname.value) && (telephone.value)) {
        usuario.primerNombre = firstName.value;
        usuario.primerApellido = firstSurname.value;
        usuario.segundoNombre = secondName.value;
        usuario.segundoApellido = secondSurname.value;
        usuario.telefono = telephone.value;
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    //When the form is submitted, the img is saved in the localstorage
    let blob = document.getElementById("inputFile").files[0];
    let reader = new FileReader();

    if (blob) { reader.readAsDataURL(blob) };
    reader.onloadend = function () {
        let base64data = reader.result;
        usuario.imgProfile = base64data;
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
})

let reader = new FileReader();
reader.addEventListener('load', (event) => {
    document.getElementById("imgPreview").src = event.target.result;
});

let persona = JSON.parse(localStorage.getItem("usuario"))
//Function that accesses the image that is saved in the localstorage
function addImg() {
    if (persona) {
        let imageFile = persona.imgProfile

        if (imageFile) {
            fetch(imageFile)
            .then(res => res.blob())
            .then(data => {
                reader.readAsDataURL(data)
            })
        }
    }
}

//Function so that when changing the input file, it shows the image. Just for preview
function selectImg() {
    let file = document.getElementById("inputFile").files[0];
    reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", function (e) {
    let emailLocal = localStorage.getItem("email");
    emailValue = document.getElementById("emailProfile").value = emailLocal;

    if (persona) {
        firstSurname.value = persona.primerApellido;
        firstName.value = persona.primerNombre;
        secondName.value = persona.segundoNombre;
        secondSurname.value = persona.segundoApellido;
        telephone.value = persona.telefono;
    }
    addImg()
})