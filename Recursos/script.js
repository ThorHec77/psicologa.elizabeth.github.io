//buscador
document.getElementById("inputSearch").addElementListener("keyup", buscador_interno);

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
}