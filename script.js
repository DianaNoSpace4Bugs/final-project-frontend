//Constantes globales API
const urlAPIBase = "https://api.spoonacular.com";
const urlRecetas = urlAPIBase + "/recipes/complexSearch";
const apiKeyQueryStringParametro = "apiKey=37c5e9e2ca57492492c5eb8cb61638a2"


//Condición para definir que lo que quiero que pase, solo va dirigido a home page:
if (window.location.pathname.includes("/home.html")){
    //Funciones para llamadas a las APIs
    
    async function pintarFotosTarjetas() {
        let infoTarjetas = [];
        //Offset 0 para obtener siempre los mismos platos
        const respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        const respuestaJson = await respuesta.json();
        const resultados =  await respuestaJson.results;
        for (let i = 0; i < resultados.length; i++) {
            infoTarjetas.push({
                image:resultados[i].image,
                title:resultados[i].title
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