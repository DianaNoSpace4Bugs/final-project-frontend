//Constantes globales API
const urlAPIBase = "https://api.spoonacular.com";
const urlRecetas = urlAPIBase + "/recipes/complexSearch";
const apiKeyQueryStringParametro = "apiKey=89b6554f06804d6396b2336e12d1521b"


//Condición para definir que lo que quiero que pase, solo va dirigido a home page:
if (window.location.pathname.includes("/home.html")) {

    //Inicializar el display del mapa y setear la vista (coordenadas y zoom)
    let map = L.map('map').setView([51.505, -0.09], 10);

    //Cargar mapa del mundo y añadirlo 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Añade marker al mapa
    const marker1 = L.marker([51.493721, -0.110830]).addTo(map);
    //Añadir popup a marker
    marker1.bindPopup("<b>FreshBites Fusion</b><br>136 Kennington Rd").openPopup();

    // Añade marker al mapa
    const marker2 = L.marker([51.495768, -0.159383]).addTo(map);
    //Añadir popup a marker
    marker2.bindPopup("<b>FreshBites Fusion</b><br>185 Pavilion Rd").openPopup();

    // Añade marker al mapa
    const marker3 = L.marker([51.521802, -0.134322]).addTo(map);
    //Añadir popup a marker
    marker3.bindPopup("<b>FreshBites Fusion</b><br>199 Tottenham Ct Rd").openPopup();


    //Funciones para llamadas a las APIs

    async function pintarFotosTarjetas() {
        let infoTarjetas = [];
        //Offset 0 para obtener siempre los mismos platos
        let respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        //En el caso de que no funcione la api por límite de uso cojo los datos del json
        if (respuesta.status === 402) {
            respuesta = await fetch("./objetos/objetoTitulosImagenes.json");
        }
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

};

//Pintar tarjetas de productos
if (window.location.pathname.includes("/products.html")) {
    //Funciones para llamadas a las APIs

    async function pintarTarjetasProductos() {
        let infoProductos = [];
        //Offset 0 para obtener siempre los mismos platos
        let respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&number=20&offset=0`);
        //En el caso de que no funcione la api por límite de uso cojo los datos del json
        if (respuesta.status === 402) {
            respuesta = await fetch("../objetos/objetoTitulosImagenes.json");
        }
        const respuestaJson = await respuesta.json();
        const resultados = await respuestaJson.results;
        for (let i = 0; i < resultados.length; i++) {
            infoProductos.push({
                image: resultados[i].image,
                title: resultados[i].title,
                id: resultados[i].id
            });
        }
        for (let i = 0; i < 20; i++) {
            let respuesta = await fetch(`${urlAPIBase}/recipes/${infoProductos[i].id}/information?${apiKeyQueryStringParametro}&includeNutrition=false&number=20&offset=0`);
            //En el caso de que no funcione la api por límite de uso cojo los datos del json
            if (respuesta.status === 402) {
                respuesta = await fetch("../objetos/objetoInformacion.json");
            }
            const respuestaJson = await respuesta.json();
            const resumen = await respuestaJson.summary;
            const template =
                `<article class="infoTarjeta">
                <h3>${infoProductos[i].title}</h3>
                <img src="${infoProductos[i].image}" alt="${infoProductos[i].title}">
                <p class="summary">${resumen}</p>
            </article>`

            document.getElementById("productos").innerHTML += template
        }
    }
    pintarTarjetasProductos()

    document.getElementById("botonBuscador").addEventListener("click", function (event) {
        const valorInputBuscador = document.getElementById("buscador").value;
        async function buscarPorFiltroNombres() {
            let respuesta = await fetch(`${urlRecetas}?${apiKeyQueryStringParametro}&query=${valorInputBuscador}&number=20&offset=0`);
            //En el caso de que no funcione la api por límite de uso cojo los datos del json
            if (respuesta.status === 402) {
                respuesta = await fetch("../objetos/objetoTitulosImagenes.json");
                const respuestaJson = await respuesta.json();
                const resultados = await respuestaJson.results;
                let infoProductos = [];
                for (let i = 0; i < resultados.length; i++) {
                    //compruebo si el texto introducido por el usuario lo contiene el título de cada plato
                    //lo pongo en minúsculas para que de igual cómo se haya escritos
                    if (resultados[i].title.toLowerCase().includes(valorInputBuscador.trim().toLowerCase())) {
                        infoProductos.push({
                            image: resultados[i].image,
                            title: resultados[i].title,
                            id: resultados[i].id
                        });
                    }

                }
                //limpio los productos que ya había en el DOM para añadir los nuevos filtrados
                const productosContenedor = document.getElementById("productos");
                productosContenedor.innerHTML = ''
                for (let i = 0; i < infoProductos.length; i++) {
                    let respuesta = await fetch(`${urlAPIBase}/recipes/${infoProductos[i].id}/information?${apiKeyQueryStringParametro}&includeNutrition=false&number=20&offset=0`);
                    //En el caso de que no funcione la api por límite de uso cojo los datos del json
                    if (respuesta.status === 402) {
                        respuesta = await fetch("../objetos/objetoInformacion.json");
                    }
                    const respuestaJson = await respuesta.json();
                    const resumen = await respuestaJson.summary;
                    const template =
                        `<article class="infoTarjeta">
                        <h3>${infoProductos[i].title}</h3>
                        <img src="${infoProductos[i].image}" alt="${infoProductos[i].title}">
                        <p class="summary">${resumen}</p>
                        </article>`

                    productosContenedor.innerHTML += template
                }
            }
            else {
                const respuestaJson = await respuesta.json();
                const resultados = await respuestaJson.results;
                let infoProductos = [];
                for (let i = 0; i < resultados.length; i++) {
                    infoProductos.push({
                        image: resultados[i].image,
                        title: resultados[i].title,
                        id: resultados[i].id
                    });
                }
                //limpio los productos que ya había en el DOM para añadir los nuevos filtrados
                const productosContenedor = document.getElementById("productos");
                productosContenedor.innerHTML = ''
                for (let i = 0; i < infoProductos.length; i++) {
                    let respuesta = await fetch(`${urlAPIBase}/recipes/${infoProductos[i].id}/information?${apiKeyQueryStringParametro}&includeNutrition=false&number=20&offset=0`);
                    //En el caso de que no funcione la api por límite de uso cojo los datos del json
                    if (respuesta.status === 402) {
                        respuesta = await fetch("../objetos/objetoInformacion.json");
                    }
                    const respuestaJson = await respuesta.json();
                    const resumen = await respuestaJson.summary;
                    const template =
                        `<article class="infoTarjeta">
                    <h3>${infoProductos[i].title}</h3>
                    <img src="${infoProductos[i].image}" alt="${infoProductos[i].title}">
                    <p class="summary">${resumen}</p>
                    </article>`

                    productosContenedor.innerHTML += template
                }
            }
        }
        buscarPorFiltroNombres()
    })

};

