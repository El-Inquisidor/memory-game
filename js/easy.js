"using strict";

document.addEventListener("DOMContentLoaded", () => {
    main_program();
});

var levelGlobal;

function main_program() {
    let highscore = document.getElementById("hgscore-value");
    let main_elem = document.getElementsByTagName("main")[0];
    let array_panels_to_select = []; //array que contendrá los paneles a seleccionars
    let paneles = []; //Se obtendrán los paneles después de generarlos
    let pila = [];
    let level;

    //Se reinicia el resultado
    document.getElementById("resultado").innerHTML = "";
    
    //se obtiene la url y si coincide con easy.htm,medm.htm o hard.htm, se ejecutara un codigo determinado
    switch (document.location.href.slice(-8)) {
        case "easy.htm": //Condicion 
            highscore.innerHTML = localStorage.getItem("highscore-easy");
            level = 1; //Esto se guarda para la posterior llamada a selectPanelsMem()
            levelGlobal = 1;

            for(let i=0;i<4;i++){
                pila.push(document.createElement("section"));

                let pila_divs = [];
                for(let j=0;j<4;j++){ 
                    pila_divs.push(document.createElement("div"));
                    pila[i].appendChild(pila_divs[j]);
                }
                
                main_elem.appendChild(pila[i]);
            }
            
            break;
        case "medm.htm":
            highscore.innerHTML = localStorage.getItem("highscore-medm");
            level = 2; //Esto se guarda para la posterior llamada a selectPanelsMem()
            levelGlobal = 2;

            for(let i=0;i<6;i++){
                pila.push(document.createElement("section"));

                let pila_divs = [];
                for(let j=0;j<6;j++){
                    let panel_medm = document.createElement("div"); 
                    panel_medm.setAttribute("class","medm-panel");
                    pila_divs.push(panel_medm);
                    pila[i].appendChild(pila_divs[j]);
                }
                
                main_elem.appendChild(pila[i]);
            }

            break;
        case "hard.htm":
            highscore.innerHTML = localStorage.getItem("highscore-hard");
            level = 3; //Esto se guarda para la posterior llamada a selectPanelsMem()
            levelGlobal = 3;

            for(let i=0;i<8;i++){
                pila.push(document.createElement("section"));

                let pila_divs = [];
                for(let j=0;j<8;j++){
                    let panel_hard = document.createElement("div"); 
                    panel_hard.setAttribute("class","hard-panel");
                    pila_divs.push(panel_hard);
                    pila[i].appendChild(pila_divs[j]);
                }
                
                main_elem.appendChild(pila[i]);
            }
            break;
    }//END_SWITCH
    
    //Obtenemos un array de todos los paneles a través de document
    paneles = document.getElementsByTagName("div");
            
    //Esperamos 4 segundos y obtenemos numeros random para pintar los paneles
    setTimeout(()=>{
        //Temporizador de tiempo antes de que desaparezcan los paneles selecc.
        document.getElementsByTagName("header")[0].innerHTML = "5";
        let idInt = setInterval(()=>{ 
            document.getElementsByTagName("header")[0].innerHTML = parseInt(document.getElementsByTagName("header")[0].innerHTML)-1;
            console.log("-->[[SEGUNDO]]")
        },1000);
        setTimeout(()=>{ //El temporizador finaliza y se elimina de la pantalla
            clearInterval(idInt);
            document.getElementsByTagName("header")[0].innerHTML = "";
        }, 5000);

        array_panels_to_select=selectPanelsMem(level);

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
            cantidadPanelesNivel = Math.floor(Math.random()*2)+1;

            cantidadPanelesNivel === 1 ? cantidad_paneles_a_select = 10 : cantidad_paneles_a_select = 11;

            for(let i=0;i<cantidad_paneles_a_select;i++){
                let numRandomPanel = Math.floor(Math.random()*36);

                while(paneles_a_seleccionar.includes(numRandomPanel)){
                    numRandomPanel = Math.floor(Math.random()*36);
                }

                paneles_a_seleccionar.push(numRandomPanel);
            }

            return paneles_a_seleccionar;
        //END_CASE_2    
        case 3:
            cantidadPanelesNivel = Math.floor(Math.random()*2)+1;

            cantidadPanelesNivel === 1 ? cantidad_paneles_a_select = 13 : cantidad_paneles_a_select = 14;

            for(let i=0;i<cantidad_paneles_a_select;i++){
                let numRandomPanel = Math.floor(Math.random()*64);

                while(paneles_a_seleccionar.includes(numRandomPanel)){
                    numRandomPanel = Math.floor(Math.random()*64);
                }

                paneles_a_seleccionar.push(numRandomPanel);
            }

            return paneles_a_seleccionar;
        //END_CASE_3
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

                    //Asignación de puntos dependiendo del nivel y los paneles acertados, únicamente si se ha ganado el nivel
                    if((document.location.href.slice(-8)==="easy.htm" && numPanelesSelect.length === 7) || ((document.location.href.slice(-8)==="medm.htm" && numPanelesSelect.length === 10)) || ((document.location.href.slice(-8)==="hard.htm" && numPanelesSelect.length === 13))){
                        score.innerHTML = parseInt(score.innerHTML)+100;
                    } else if ((document.location.href.slice(-8)==="easy.htm" && numPanelesSelect.length === 8) || ((document.location.href.slice(-8)==="medm.htm" && numPanelesSelect.length === 11)) || ((document.location.href.slice(-8)==="hard.htm" && numPanelesSelect.length === 14))){
                        score.innerHTML = parseInt(score.innerHTML)+150;
                    }

                    //HIGHSCORE
                    if(levelGlobal === 1){
                        if(parseInt(score.innerHTML) > localStorage.getItem("highscore-easy")){
                            localStorage.setItem("highscore-easy", score.innerHTML);
                        }   
                    } else if(levelGlobal === 2){
                        if(parseInt(score.innerHTML) > localStorage.getItem("highscore-medm")){
                            localStorage.setItem("highscore-medm", score.innerHTML);
                        }   
                    } else if(levelGlobal === 3){
                        if(parseInt(score.innerHTML) > localStorage.getItem("highscore-hard")){
                            localStorage.setItem("highscore-hard", score.innerHTML);
                        }   
                    }

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