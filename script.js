//Constantes globales API
const urlAPIBase = "https://api.spoonacular.com";
const urlRecetas = urlAPIBase + "/recipes/complexSearch";
const apiKeyQueryStringParametro = "apiKey=37c5e9e2ca57492492c5eb8cb61638a2"


//Condición para definir que lo que quiero que pase, solo va dirigido a home page:
if (window.location.pathname.includes("/home.html")) {
    //Funciones para llamadas a las APIs

    async function pintarFotosTarjetas() {
        let infoTarjetas = [];
        //Offset 0 para obtener siempre los mismos platos
        const respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        const respuestaJson = await respuesta.json();
        const resultados = await respuestaJson.results;
        for (let i = 0; i < resultados.length; i++) {
            infoTarjetas.push({
                image: resultados[i].image,
                title: resultados[i].title
            });

        }
        for (let i = 0; i < 5; i++) {
            const template =
                `<article class="infoTarjeta">
                <h3>${infoTarjetas[i].title}</h3>
                <img src="${infoTarjetas[i].image}" alt="${infoTarjetas[i].title}">
            </article>`

            document.getElementById("fotosPlatosPopulares").innerHTML += template
        }
    }
    pintarFotosTarjetas()
}

// Validación formulario
if (window.location.pathname.includes("/contact.html")) {

    document.getElementById("formularioContacto").addEventListener("submit", function validar(event) {
        event.preventDefault();

        const emailRegexValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const regexEmail = new RegExp(emailRegexValidator)

        if (!document.getElementById("text").value) {
            alert("First name field is required")
            return false
        }
        if (!document.getElementById("text2").value) {
            alert("Last name field is required")
            return false
        }
        if (!document.getElementById("email").value) {
            alert("Email field is required")
            return false
        }
        if (!regexEmail.test(document.getElementById("email").value)) {
            alert("Email format is incorrect")
            return false
        }
        if (!document.getElementById("mensaje").value) {
            alert("Question or suggestion field is required")
            return false
        }
        alert("Your form has been submitted successfully")
    })

}