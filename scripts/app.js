// Variables -
const formulario = document.getElementById("form")
const tareaHTML = document.getElementById("tareas")

let arrayTareas

// Funciones -
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
const eliminarTarea = (miTarea, colorDeTarea) => {
    let indexArray
    arrayTareas.forEach((element, index) => {
        if (miTarea == element.titulo && colorDeTarea == "alert-" + element.color) {
            indexArray = index
        }
    });
    arrayTareas.splice(indexArray, 1)
    agregarAlocal()
    mostrarEnPantalla()
}

//Hay que modularizar mas
const modificarTarea = (miTarea, colorDeTarea) => {
    document.getElementById("tituloDeTarea").value = miTarea
    arrayTareas = JSON.parse(localStorage.getItem("tarea"))
    let modificado = false
    for (let i = 0; i < arrayTareas.length; i++) {

        if (miTarea == arrayTareas[i].titulo && !modificado) {
            if (colorDeTarea == "alert-" + arrayTareas[i].color) {
                formulario.colores.value = arrayTareas[i].color
                formulario.enviar.value = "Modificar"
                formulario.addEventListener("submit", (e) => {
                    if (formulario.enviar.value == "Modificar") {
                        console.log(arrayTareas);
                        e.preventDefault()
                        let tarea = {
                            completado: arrayTareas[i].completado,
                            fecha: generarFecha(),
                            titulo: document.getElementById("tituloDeTarea").value,
                            color: formulario.colores.value
                        }
                        arrayTareas[i] = tarea
                        agregarAlocal()
                        mostrarEnPantalla()
                        modificado = true
                        formulario.colores.value = arrayTareas[i].color
                        formulario.enviar.value = "Agregar tarea"
                    }
                })
            }
        }
    }
}




// Eventos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById("tituloDeTarea").value && formulario.enviar.value == "Agregar tarea") agregarTarea(document.getElementById("tituloDeTarea").value, formulario.colores.value)
    mostrarEnPantalla();
})

window.addEventListener("click", (e) => {
    if (e.target.attributes[0].value == "borrar") eliminarTarea(e.target.parentNode.previousElementSibling.innerText, e.target.parentNode.parentNode.classList[1]);
    if (e.target.attributes[0].value == "modificar") modificarTarea(e.target.parentNode.previousElementSibling.innerText, e.target.parentNode.parentNode.classList[1]);

})
window.addEventListener("load", () => {
    mostrarEnPantalla()
})