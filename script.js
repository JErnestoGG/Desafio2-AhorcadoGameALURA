let palabras=["limonada", "camarero", "edificio", "caballo", "zanahoria", "armadura", "ladrillo"
            , "hormiga", "peperoni", "pesadilla", "cafeteria" , "mandarina", "caiman", "margarita"];
let imagen=document.getElementById("banner");
let img=document.getElementById("img");
let parrafo=document.getElementById("palabra");
let letraUsada=document.getElementById("historialLetras");
let input=document.getElementById("inputPalabra");
let mensajeInfo=document.getElementById("mensaje");
let mensajeAlert=document.getElementById("alerta");
let palabra=[];
let historialDeLetras=[];
let numExitos=0;
let numfracasos=0;

let btn_nuevoJuego=document.getElementById("boton1");
let btn_adicionarPalabra=document.getElementById("boton2");
let btn_palabraNueva=document.getElementById("boton3");
let btn_rendicion=document.getElementById("boton4");

// funcion que genera una palabra aleatoria del arreglo de palabras//
function sortearPalabra() {  
    let num;
    num=Math.round(Math.random()*(palabras.length));
    return  palabras[num];
}

// funcion que Crea los espacios de las letras//
function mostrarPalabra() {
    parrafo.innerHTML=" ";
    document.getElementById("divPalabra").style.visibility="visible";
    document.getElementById("divHistorial").style.visibility="visible";
    palabra=sortearPalabra().toLocaleUpperCase();
    let arrayPalabra=Array.from(palabra)
    for (let i = 0; i < arrayPalabra.length; i++) {
        const span=document.createElement("span");
        parrafo.appendChild(span);
    }
}

//funcion que muestra el mensaje cuando se acierta la palabra, desabilita el eventListener y muestra 
// los botones principales 
function ganar() {
    document.removeEventListener("keydown", validarLetra );
    mensajeInfo.innerHTML=("Felicidades ganó, adivinó la palabra, " + palabra);
    mensajeInfo.style.color="lime";
    btn_nuevoJuego.style.visibility="visible";
    btn_adicionarPalabra.style.visibility="visible";
    btn_rendicion.style.display="none";
   
}

//funcion que muestra el mensaje cuando erra la palabra, desabilita el eventListener y muestra 
// los botones principales 
function perder() {
            document.removeEventListener("keydown", validarLetra );
            mensajeInfo.innerHTML=("El juego terminó. La palabra era: " + palabra);
            mensajeInfo.style.color="red";
            btn_nuevoJuego.style.visibility="visible";
            btn_adicionarPalabra.style.visibility="visible";
            btn_rendicion.style.display="none";
}

//funcion llamada por el boton de desistir del juego
function rendirse() {
    numfracasos=7;
    img.src="imagenes/horca7.png";
    perder();
}

//funcion que aumenta el numero de errores, cambia la imagen principal y verifica si se perdio el juego
function erroletra() {
    numfracasos++;
    let source= `imagenes/horca${numfracasos}.png`;
    img.src=source;

    if (numfracasos==7){
       perder();
    }
}

//funcion que aumenta el numero de aciertos,verifica si se adivino la palabra
function acertoLetra(letra1) {
    let letras=document.querySelectorAll("#palabra span");
   for (let i = 0; i < palabra.length; i++) {
        if (letra1==palabra[i]){
        letras[i].innerHTML=letra1.toLocaleUpperCase();
        numExitos++;
         }

    }
              
    if (numExitos==palabra.length){
           ganar();
    }  
}

//funcion que verfifica si la letra ingresada esta incluida en la palabra y muestra un respectivo mensaje
function letraIngresada(letra1) {
    if (palabra.includes(letra1)) {
        mensajeInfo.innerHTML=("¡Bien!, la letra " + letra1 + " está en la palabra.");
        acertoLetra(letra1);
    }
    else{
        mensajeInfo.innerHTML=("¡Ups!, la letra " + letra1 + ", no esta en la palabra.");
        erroletra();   
    }
    historialDeLetras.push(letra1);
    
}

//funcion que muestra la letra usada en el historial de letras
function letrasUsadas(letra1) {
    const span=document.createElement("span");
        span.innerHTML=letra1.toUpperCase();
        span.classList.add("letraUsada");
        letraUsada.appendChild(span); 
}

//funcion que Valida el ingreso de letras y no permite ingresar numeros ni teclas especiales
function validarLetra(event) {
        teclaPresionada=event.key.toUpperCase();
        if (teclaPresionada.match(/^[a-zñ]$/i) && !historialDeLetras.includes(teclaPresionada)){
            letraIngresada(teclaPresionada);
            letrasUsadas(teclaPresionada);
            
        }
        else if(historialDeLetras.includes(teclaPresionada)){
            mensajeInfo.innerHTML=("Fíjate, ya usaste la letra " + teclaPresionada);
        }        
 }

 //funcion encaragada de limpiar las variables y los elementos que se muestras en pantalla
function resetearValues() {
    img.src="imagenes/horca0.png";
    letraUsada.innerHTML="";
    historialDeLetras=[];
    numExitos=0;
    numfracasos=0;
    document.getElementById("agregarPalabra").style.visibility="hidden";
    btn_adicionarPalabra.style.visibility="hidden";
    mensajeInfo.innerHTML=("¡Buena suerte!");
    mensajeInfo.style.color="white";
    
}

//funcion principal llamada desde el boton nuevojuego
function iniciarJuego() {
    resetearValues();
    mostrarPalabra();

    document.addEventListener("keydown", validarLetra);
    btn_nuevoJuego.style.visibility="hidden";
    mensajeInfo.style.visibility="visible";
    btn_rendicion.style.display="block";
}

 
//Funciones Del boton Agregar palabra//
let palabraNueva;


// Validamos el contenido del input Text
function agregar() {
    
    palabraNueva=input.value;
    
    //Validamos que no este vacio//
    if (palabraNueva=="") {
        mensajeAlert.innerHTML="Por favor, ingresa una palabra";
        input.focus();
    }
    //Validamos que la palabra no este en el arreglo antes de agregarla
    else if (!palabras.includes(palabraNueva)){
        palabras.push(palabraNueva);
        mensajeAlert.innerHTML="Su palabra fue agregada correctamente";
        document.getElementById("agregarPalabra").style.visibility="hidden";
        btn_nuevoJuego.style.visibility="visible";
        
    }
    //Validamos que no incluya una palabra que ya existe en el arreglo//
    else{
        mensajeAlert.innerHTML="Esa palabra ya existe en el juego";
        input.focus();
    }  
}

// Funcion que no permite la entrada de numeros ni teclas especiales
function validacion(event) {
    letra=event.key;
    if (letra.match(/^[a-zñ]$/i) || event.keyCode == 8){

    }
      else{
        event.returnValue=false;
        
      }  
}

// Funcion principal de esta funcionalidad llamada desde el boton AdicionarPalabra
function validarInput() {
    document.getElementById("agregarPalabra").style.visibility="visible";
    btn_nuevoJuego.style.visibility="hidden";
    input.value="";
    input.focus();
    mensajeAlert.innerHTML="";
    input.addEventListener("keypress", validacion,{
    
  });
 
    
}



//Llamamos a las funciones principales con los botones
//mediante el evento onclick
btn_nuevoJuego.onclick=iniciarJuego;
btn_adicionarPalabra.onclick=validarInput;
btn_palabraNueva.onclick=agregar;
btn_rendicion.onclick=rendirse;