let formProfile = document.getElementById("myProfile");

formProfile.addEventListener("submit", function (e) {
    let firstSurname = document.getElementById("firstSurname");
    let firstName = document.getElementById("firstName");
    let telephone = document.getElementById("telephone");
    let secondName = document.getElementById("secondName");
    let secondSurname = document.getElementById("secondSurname");



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

    localStorage.setItem("firstSurname", firstSurname.value);
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("secondName", secondName.value);
    localStorage.setItem("secondSurname", secondSurname.value);
    localStorage.setItem("telephone", telephone.value);



    let file = document.getElementById("inputFile").files[0];
    localStorage.setItem("file", file);
    //let imgPreview = document.getElementById("imgPreview");

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        document.getElementById("imgPreview").src = event.target.result;
    });
    reader.readAsDataURL(file)
})


/*function addImg() {
    let file = document.getElementById("inputFile").files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        document.getElementById("imgPreview").src = event.target.result;
    });

    reader.readAsDataURL(file);
}*/


let emailLocal = localStorage.getItem("email");
emailValue = document.getElementById("emailProfile").value = emailLocal;

document.getElementById("firstSurname").value = localStorage.getItem("firstSurname");
document.getElementById("firstName").value = localStorage.getItem("firstName");
document.getElementById("secondName").value = localStorage.getItem("secondName");
document.getElementById("secondSurname").value = localStorage.getItem("secondSurname");
document.getElementById("telephone").value = localStorage.getItem("telephone");