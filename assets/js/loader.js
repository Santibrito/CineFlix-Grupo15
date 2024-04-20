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
        contentHeader.style.display = "block";
        contentHeader.style.opacity = 0;
        contentMain.style.display = "block";
        contentMain.style.opacity = 0;
        setTimeout(function () {
            contentHeader.style.transition = "opacity " + fadeDuration / 1000 + "s ease";
            contentHeader.style.opacity = 1;
            contentMain.style.transition = "opacity " + fadeDuration / 1000 + "s ease";
            contentMain.style.opacity = 1;
        }, 100);
    }

    var loader = document.getElementById('loader');
    var contentHeader = document.getElementById('content-header');
    var contentMain = document.getElementById('content-main');

    setTimeout(function () {
        fadeOutLoader();
    }, loaderDuration);
}

showLoader(0, 0); // Ejemplo de duración del loader de 3 segundos y efecto de fade de 1 segundo
//showLoader(3000, 1000);
