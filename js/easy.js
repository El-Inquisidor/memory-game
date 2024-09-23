"using strict";

document.addEventListener("DOMContentLoaded", () => {
    main_program();
});

function main_program() {
    let main_elem = document.getElementsByTagName("main")[0];
    let array_panels_to_select = []; //array que contendrá los paneles a seleccionars
    let paneles = []; //Se obtendrán los paneles después de generarlos
    
    //Se reinicia el resultado
    document.getElementById("resultado").innerHTML = "";
    
    //se obtiene la url y si coincide con easy.htm,medm.htm o hard.htm, se ejecutara un codigo determinado
    switch (document.location.href.slice(-8)) {
        case "easy.htm": //Condicion easy
    
            let pila = [];
            
            for(let i=0;i<4;i++){
                pila.push(document.createElement("section"));

                let pila_divs = [];
                for(let j=0;j<4;j++){ 
                    pila_divs.push(document.createElement("div"));
                    pila[i].appendChild(pila_divs[j]);
                }
                
                main_elem.appendChild(pila[i]);
            }
            
            //Obtenemos un array de todos los paneles a través de document
            paneles = document.getElementsByTagName("div");
            
            //Esperamos 4 segundos y obtenemos numeros random para pintar los paneles
            setTimeout(()=>{
                array_panels_to_select=selectPanelsMem(1);

                //Para no utilizar async-await de momento, utilizo otro setTimeout
                setTimeout(()=>{
                    for(let i=0;i<paneles.length;i++){
                        if(array_panels_to_select.includes(i)){
                            paneles[i].style.transform = "rotate3d(0, 1, 0, 180deg)";
                            paneles[i].style.backgroundColor = "#ff0000";
                        }
                    }
                    //En el siguiente timeout esperamos unos segundos y desaparecen los paneles seleccionados
                    setTimeout(()=>desaparecerPaneles(array_panels_to_select, paneles), 5000); //TIMEOUT_3
                },100); //TIMEOUT_2
            }, 3000); //TIMEOUT_1
    
            break;
    }//END_SWITCH
}//END_FUNCTION

function selectPanelsMem(level) {
    let cantidadPanelesNivel;
    let cantidad_paneles_a_select;
    let paneles_a_seleccionar = [];

    switch(level) {
        case 1:
            cantidadPanelesNivel = Math.floor(Math.random()*2)+1;

            cantidadPanelesNivel === 1 ? cantidad_paneles_a_select = 7 : cantidad_paneles_a_select = 8;

            for(let i=0;i<cantidad_paneles_a_select;i++){
                let numRandomPanel = Math.floor(Math.random()*16);

                while(paneles_a_seleccionar.includes(numRandomPanel)){
                    numRandomPanel = Math.floor(Math.random()*16);
                }

                paneles_a_seleccionar.push(numRandomPanel);
            }

            return paneles_a_seleccionar;
        //END_CASE_1
        case 2:
            ;
        case 3:
            ;
    }//END_SWITCH
}//END_FUNCTION


function desaparecerPaneles(numPanelesSelect, divsPaneles) {
    for(let i=0;i<divsPaneles.length;i++){
        if(numPanelesSelect.includes(i)){
            divsPaneles[i].style.transform = "rotate3d(0, 0, 0, 180deg)";
            divsPaneles[i].style.backgroundColor = "#000000";
        }
        divsPaneles[i].addEventListener("click",(event)=>panelSeleccionado(numPanelesSelect, divsPaneles, event.target));
    }
}

function panelSeleccionado(numPanelesSelect, divsPaneles, elemActivado) {
    //document.location.assign("../levels/easy.htm");
    let resultado = document.getElementById("resultado"); //article que escribe el resultado
    let score = document.getElementById("score-value");

    for(let i=0;i<divsPaneles.length;i++){
        let cont_correct_panels = 0; //Contador. Si se selecciona un panel correcto se comprueba con el contador si se han seleccionado todos

        if(divsPaneles[i] === elemActivado){
            console.log(`ELEMENTO SELECCIONADO: ${i}`);

            if(numPanelesSelect.includes(i)){ //CORRECT
                console.log(" --> CORRECT");
                divsPaneles[i].style.backgroundColor = "red"; //El panel seleccionado correcto pasa a rojo

                //Comprobamos si se han seleccionado todos los paneles correctos

                for(let i=0;i<divsPaneles.length;i++){
                    if(divsPaneles[i].style.backgroundColor === "red") cont_correct_panels++;
                }

                //Si se han seleccionado todos los paneles se mostrará este mensaje y se realizará una acción
                if(cont_correct_panels === numPanelesSelect.length){
                    console.log("[ALL PANELS SELECTED]");
                    resultado.style.color = "black";
                    resultado.innerHTML = "CORRECT";
                    score.innerHTML = parseInt(score.innerHTML)+100;
                    restartMemTest(); //Nivel superado, se reinicia llamando al siguiente test de memoria
                }

            } else { //INCORRECT
                console.log("[INCORRECT PANEL]");
                resultado.style.color = "red";
                resultado.innerHTML = "WRONG";
                score.innerHTML = 0;

                restartMemTest(); //Se reinicia el nivel
            }
            break;
        }
    }
}

function restartMemTest() {
    let sections_elemts = document.getElementsByTagName("section"); //Se obtiene el elemento main

    while(sections_elemts.length !== 0){
        sections_elemts[0].remove();

    }

    return (()=>{
        setTimeout(main_program, 4500);
    })() //Se devuelve la ejecución de la función. (function)(). De esta forma no se devuelve su referencia, sino su ejecución
}