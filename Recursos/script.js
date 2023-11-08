

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