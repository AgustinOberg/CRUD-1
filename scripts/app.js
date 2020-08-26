// Variables
const formulario = document.getElementById("form")
const tareaHTML = document.getElementById("tareas")

let arrayTareas

// Funciones
const agregarAlocal = () => {
    localStorage.setItem("tarea", JSON.stringify(arrayTareas))
}
const generarFecha = () => {
    let f = new Date()
    return (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
}
const mostrarEnPantalla = () => {
    tareaHTML.innerHTML = ''
    arrayTareas = JSON.parse(localStorage.getItem("tarea"))
    if (arrayTareas != null) {
        arrayTareas.forEach(element => {

            tareaHTML.innerHTML += `<div name="tarea" class="alert alert-${element.color} mt-3 d-flex align-items-center row">
            <div class="col-1">
            <i class="far fa-check-square cpoint"></i>
            </div>
            <div class="col-4">
            <i>Agregada el ${element.fecha}</i>
            </div>
            <div class="col-4">
            <b>${element.titulo}</b>
            </div>
            <div class="col-3 d-flex justify-content-end align-items-center">
            <i name="modificar" class="fas fa-edit mr-3 cpoint"></i>
            <i name="borrar" class="fas fa-trash cpoint"></i>
            </div>
            </div>
            </div>`
        });

    }
    else if (arrayTareas == null) {
        arrayTareas = []
        agregarAlocal()
    }
}
const agregarTarea = (nombreTarea, tipoDeColor) => {
    let tarea = {
        completado: false,
        fecha: generarFecha(),
        titulo: nombreTarea,
        color: tipoDeColor
    }
    arrayTareas.push(tarea)
    agregarAlocal()

}
const eliminarTarea = (miTarea) => {
    arrayTareas.pop(miTarea)
    agregarAlocal()
    mostrarEnPantalla()
}

const modificarTarea = (tituloDeTarea) => {
    let index = arrayTareas.findIndex((element => element.titulo == tituloDeTarea))
    arrayTareas[index].titulo = tituloDeTarea
    agregarAlocal()
}




// Eventos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById("tituloDeTarea").value) agregarTarea(document.getElementById("tituloDeTarea").value, formulario.colores.value)
    mostrarEnPantalla();
})

window.addEventListener("click", (e) => {
    if (e.target.attributes[0].value == "borrar") eliminarTarea(e.target.parentNode.previousElementSibling.innerText);
    if (e.target.attributes[0].value == "modificar") modificarTarea(e.target.parentNode.previousElementSibling.innerText);

})
window.addEventListener("load", () => {
    mostrarEnPantalla()
})