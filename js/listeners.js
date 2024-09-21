    /**********************
    *      Listeners      *
    **********************/


"using strict";

function addListeners() {
    let secEasy, secMedium, secHard;
    secEasy = document.getElementById("section-easy01");
    secMedium = document.getElementById("section-medium01");
    secHard = document.getElementById("section-hard01");

    //Añadiendo los listeners
    secEasy.addEventListener("click", () => Main.menu(1));
    secMedium.addEventListener("click", () => Main.menu(2));
    secHard.addEventListener("click", () => Main.menu(3));


    console.log("Listeners added");
}