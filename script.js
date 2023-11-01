//Constantes globales API
const urlAPIBase = "https://api.spoonacular.com";
const urlRecetas = urlAPIBase + "/recipes/complexSearch";
const apiKeyQueryStringParametro = "apiKey=37c5e9e2ca57492492c5eb8cb61638a2"


//Condición para definir que lo que quiero que pase, solo va dirigido a home page:
if (window.location.pathname.includes("/home.html")){
    //Funciones para llamadas a las APIs
    async function obtenerFotosSlider() {
        let sliderFotos = [];
        //Offset 0 para obtener siempre los mismos platos
        const respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        const respuestaJson = await respuesta.json();
        const resultados = respuestaJson.results;
        for (let i = 0; i < resultados.length; i++) {
            sliderFotos.push(resultados[i].image);
            
        }
        return sliderFotos;
    }
    
    async function pintarSliderFotos(template,arrayDeFotos) {
        for (let i = 0; i < arrayDeFotos.length; i++) {
            let template = 
            `<article class="fotoSlider">
                <img src="${arrayDeFotos[i]}" alt="imagenPlato${[i]}">
            </article>`   
            document.getElementById("sliderFotos").innerHTML = template
        }
    }
    
    //Puedo necesitarlo después como opción para llamar a mi función:
    // let sliderFotos = await obtenerFotosSlider();
    // console.log(sliderFotos);

}