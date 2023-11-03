//Constantes globales API
const urlAPIBase = "https://api.spoonacular.com";
const urlRecetas = urlAPIBase + "/recipes/complexSearch";
const apiKeyQueryStringParametro = "apiKey=37c5e9e2ca57492492c5eb8cb61638a2"


//Condición para definir que lo que quiero que pase, solo va dirigido a home page:
if (window.location.pathname.includes("/home.html")){
    //Funciones para llamadas a las APIs
    
    async function pintarFotosSlider() {
        let sliderFotos = [];
        //Offset 0 para obtener siempre los mismos platos
        const respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        const respuestaJson = await respuesta.json();
        const resultados =  await respuestaJson.results;
        for (let i = 0; i < resultados.length; i++) {
            sliderFotos.push(resultados[i].image);
        }
        for (let i = 0; i < sliderFotos.length; i++) {
            let template = 
            `<div id="contenedorSlider">
            <article class="fotoSlider">
                <img src="${sliderFotos[0]}" alt="imagenPlato${[0]}">
            </article>
            <article class="fotoSlider">
                <img src="${sliderFotos[1]}" alt="imagenPlato${[1]}">
            </article>
            <article class="fotoSlider">
                <img src="${sliderFotos[3]}" alt="imagenPlato${[3]}">
            </article>
            <article class="fotoSlider">
                <img src="${sliderFotos[4]}" alt="imagenPlato${[4]}">
            </article>
            <article class="fotoSlider">
                <img src="${sliderFotos[5]}" alt="imagenPlato${[5]}">
            </article>
            <article class="fotoSlider">
                <img src="${sliderFotos[6]}" alt="imagenPlato${[6]}">
            </article>    
            </div>`
               
            document.getElementById("sliderFotos").innerHTML = template
    }
    }
    pintarFotosSlider()
    
    // let sliderFotos = obtenerFotosSlider();
    // console.log(sliderFotos);
    
    // async function pintarSliderFotos() {
    //     console.log(sliderFotos);
    //     for (let i = 0; i < sliderFotos.length; i++) {
    //         let template = 
    //         `<article class="fotoSlider">
    //             <img src="${sliderFotos[i]}" alt="imagenPlato${[i]}">
    //         </article>`   
    //         document.getElementById("sliderFotos").innerHTML = template
    //     }
    // }
    // pintarSliderFotos()
    //Puedo necesitarlo después como opción para llamar a mi función:

}