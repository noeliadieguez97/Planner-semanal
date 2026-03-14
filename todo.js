const botones = document.querySelectorAll(".agregar");
botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const dia = boton.parentElement;
        
        const input = dia.querySelector(".input-tarea");
        const lista = dia.querySelector(".lista");
        
        const texto = input.value.trim();
        if(texto === "") return;

       crearTarea(lista,texto,false);

input.value="";

guardarTareas();

});

});

function crearTarea(lista,texto,completada){

const li = document.createElement("li");
li.draggable = true;

const span = document.createElement("span");
span.textContent = texto;

const eliminar = document.createElement("button");
eliminar.textContent="X";
eliminar.classList.add("eliminar");

li.appendChild(span);
li.appendChild(eliminar);

if(completada){
li.classList.add("completada");
span.textContent = "✔ " + texto;
}

lista.appendChild(li);


li.addEventListener("click",(e)=>{

if(e.target.tagName !== "BUTTON"){

li.classList.toggle("completada");

if(li.classList.contains("completada")){
span.textContent = "✔ " + texto;
}else{
span.textContent = texto;
}

guardarTareas();

}

});


eliminar.addEventListener("click",()=>{

li.remove();
guardarTareas();

});

li.addEventListener("dragstart",()=>{
li.classList.add("dragging");
});

li.addEventListener("dragend",()=>{
li.classList.remove("dragging");
});

}

const listas = document.querySelectorAll(".lista");

listas.forEach(lista=>{

lista.addEventListener("dragover",(e)=>{

e.preventDefault();

const tarea = document.querySelector(".dragging");

if(tarea){
lista.appendChild(tarea);
}

});

});

function guardarTareas(){

const datos=[];

document.querySelectorAll(".dia").forEach((dia)=>{

const nombre = dia.querySelector("h3").textContent;

const tareas=[];

dia.querySelectorAll("li").forEach((li)=>{

tareas.push({
texto:li.querySelector("span").textContent,
completada:li.classList.contains("completada")
});

});

datos.push({dia:nombre,tareas});

});

localStorage.setItem("planner",JSON.stringify(datos));

}


function cargarTareas(){

const datos = JSON.parse(localStorage.getItem("planner"));

if(!datos) return;

datos.forEach((diaGuardado)=>{

document.querySelectorAll(".dia").forEach((col)=>{

const titulo = col.querySelector("h3").textContent;

if(titulo === diaGuardado.dia){

const lista = col.querySelector(".lista");

diaGuardado.tareas.forEach((t)=>{

crearTarea(lista,t.texto,t.completada);

});

}

});

});

}

cargarTareas();
