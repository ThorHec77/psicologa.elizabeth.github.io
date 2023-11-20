

/*//buscador
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno() {
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //recorriendo elemento a filtrar mediante los li
    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;
        if(textValue.toUpperCase.indexOf(filter) < -1){
            li[i].style.dispay = "";
            box_search.style.dispay = "block";
            if (inputSearch.value === "") {
                box_search.style.dispay = "none";
            }
        }else{
            li[i].style.dispay = "none";
        }
    }
}*/
// Cambiar imagen por imagen a color

function cambiarImg(img) {
    document.getElementById('faceboock').src = img;
    //alert(img);
}
function cambiarImg1(img) {
    document.getElementById('whatsapp').src = img;
    //alert(img);
}
function cambiarImg2(img) {
    document.getElementById('instagram').src = img;
    //alert(img);
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('formSearch');
    var inputSearch = document.getElementById('inputSearch');
    var searchResultMessage = document.getElementById('searchResultMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var searchTerm = inputSearch.value.toLowerCase(); // Convertir a minúsculas para una búsqueda sin distinción de mayúsculas/minúsculas

        // Limpiar resaltados anteriores
        var highlightedElements = document.querySelectorAll('.search-highlight');
        highlightedElements.forEach(function (element) {
            element.classList.remove('search-highlight');
        });

        // Buscar en el contenido del documento HTML
        var allElements = document.querySelectorAll('*');
        var matchingElement = null;

        allElements.forEach(function (element) {
            // Verificar si el texto del elemento contiene el término de búsqueda
            if (element.textContent.toLowerCase().includes(searchTerm)) {
                matchingElement = element;
                return; // Detener la iteración una vez que se encuentra una coincidencia
            }
        });

        // Si se encuentra un elemento que coincide, resaltar y desplazar hacia él
        if (matchingElement) {
            matchingElement.classList.add('search-highlight');
            matchingElement.scrollIntoView({ behavior: 'smooth' });
            searchResultMessage.textContent = ''; // Limpiar el mensaje de resultado
        } else {
            searchResultMessage.textContent = 'No se encontraron resultados.';
        }
    });
});