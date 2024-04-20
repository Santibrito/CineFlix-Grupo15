const URL = "https://santibrito.github.io/CineFlix-Grupo15/assets/js/data.json"

/**
 * Carga las películas desde un archivo JSON.
 * 
 * @throws {Error} Si la respuesta de la red no es válida.
 * @returns {Promise} Una promesa que se resuelve con los datos cargados del archivo JSON.
 */
function requestDataMovies() {
    fetch(URL)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }).then(data => {
            showContent(data.bestMovies); // Header
        }).catch(error => console.error('Error al cargar el archivo JSON:', error));
}

requestDataMovies();

/**
 * Muestra el contenido dinámico en el elemento especificado.
 * 
 * @param {Array<Function>} element - Un array de funciones que manejan la lógica del contenido dinámico.
 * @returns {void}
 */
function showContent(element) {
    let carouselActive = true;
    element.forEach(dataElement => {
        headerComponent(dataElement, carouselActive);
        carouselActive = false;
    });
}

/**
 * Genera y muestra un elemento de carrusel de películas en el encabezado.
 * 
 * @param {Object} dataElement - Los datos de la película que se utilizarán para construir el elemento del carrusel.
 * @param {boolean} carouselActive - Indica si este elemento del carrusel debe estar activo inicialmente.
 * @returns {void}
 */
function headerComponent(dataElement, carouselActive) {
    let carouselContainer = document.getElementById('header-movies');
    const carousel = document.createElement('div');
    carousel.classList.add('carousel-item');
    if (carouselActive) carousel.classList.add('active');

    const content = `
    <div class="imagen-superpuesta" style="background-image:  linear-gradient(rgba(0, 0, 0, 0), rgb(15, 14, 22)),url('${dataElement.img}')"></div>
    <section class="movie-header container">
        <h1>${dataElement.name}</h1>
            <div class="info-movie">
                <p class="pg-info">PG-${dataElement.pg}</p>
                <p class="time-info">${dataElement.duration}</p>
            </div>
        <p class="description-movie">${dataElement.description}</p>
        <button>
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0V10.4102L11.925 5.20512L0 0Z" fill="#FFFBFB"/></svg>
            Ver ahora
        </button>
    </section>
    `;

    carousel.innerHTML = content;
    carouselContainer.appendChild(carousel);
}

/**
 * Función para mostrar un loader por un tiempo determinado y luego mostrar el contenido.
 * 
 * @param {number} loaderDuration - Duración en milisegundos del loader.
 * @param {number} fadeDuration - Duración en milisegundos del efecto de fade.
 */
function showLoader(loaderDuration, fadeDuration) {
    function fadeOutLoader() {
        loader.style.transition = "opacity " + fadeDuration / 1000 + "s ease";
        loader.style.opacity = 0;

        setTimeout(function () {
            loader.style.display = "none";
            fadeInContent();
        }, fadeDuration);
    }
    function fadeInContent() {
        content.style.display = "block";
        content.style.opacity = 0;
        setTimeout(function () {
            content.style.transition = "opacity " + fadeDuration / 1000 + "s ease";
            content.style.opacity = 1;
        }, 100);
    }

    var loader = document.getElementById('loader');
    var content = document.getElementById('content');

    setTimeout(function () {
        fadeOutLoader();
    }, loaderDuration);
}

showLoader(3000, 1000); // Ejemplo de duración del loader de 3 segundos y efecto de fade de 1 segundo
