    /**********************
    *       MAIN.JS       *
    *  Inicializacion de  *
    *    los metodos      *
    **********************/

/****************************
*  Created by El.Inquisidor *
****************************/

"using strict"; //Modo estricto

//Declaración e inicialización

//Clase que contiene utilidades y la lógica del menú
class Main { //Se declara esta clase antes por contener el mensaje del DOM cargado
    static menu(opcion) {
        
        switch(opcion) {
            case 1:
                window.location.replace("levels/easy.htm"); //Se reemplaza en lugar de cambiar el href
                break;
            case 2:
                window.location.replace("levels/medm.htm");
                break;
            case 3:
                window.location.replace("levels/hard.htm");
                break;
        }
    }

    static domLoaded(){
        console.log("DOM Cargado Correctamente");
        
        //Eliminación de la pantalla de carga y ejecución del programa principal
        document.getElementById("loading").style.opacity = 0;
        document.getElementById("loading").style.zIndex = -1;

        exec_main();
    }
}

//Carga del DOM
console.log("Cargando DOM...");
document.addEventListener("DOMContentLoaded", Main.domLoaded);

function exec_main(){
    let add_list = addListeners; //Asignando funcion de listeners a variable
    add_list();
}
