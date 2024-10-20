let listaPreguntas = [];
let indicePreguntaActual = 0;
let preguntasPorPagina = 2;
let puntaje = 0;
let nombreJugador = "";
let preguntasAcertadas = 0;
let preguntasFalladas = 0;

// Funcion cargar preguntas JSON
const cargarPreguntas = async () => {
    try {
        let respuesta = await fetch('preguntas.json');
        listaPreguntas = await respuesta.json();

        // Mezclamos preguntas y mostramos las primeras
        listaPreguntas = barajar(listaPreguntas);
        mostrarPreguntas();
    } catch (error) {
        alert("Error al cargar las preguntas.");
        console.error("Error de carga:", error);
    }
}

// Nombre y comenzar el concurso
const iniciarConcurso = () => {
    nombreJugador = document.getElementById("name").value.trim();
    if (!nombreJugador) {
        alert("Mete un nombre para comenzar.");
        return;
    }
    cargarPreguntas();
}

// DOM este cargado y listo
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("botonIniciar").addEventListener("click", iniciarConcurso);
});

// Funcion para desordenar
const barajar = (mezcla) => {
    for (let i = mezcla.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezcla[i], mezcla[j]] = [mezcla[j], mezcla[i]];
    }
    return mezcla;
};


// Funcion para mostrar las preguntas
const mostrarPreguntas = () => {
    // Eliminar el contenedor del usuario
    let cuadroUsuario = document.getElementById("C_user");
    if (cuadroUsuario) {
        cuadroUsuario.remove(); // Eliminar
    }

    // Eliminar el contenedor de preguntas anterior
    let contenedorPreguntasExistente = document.getElementById("C_preguntas");
    if (contenedorPreguntasExistente) {
        contenedorPreguntasExistente.remove(); // Eliminar
    }

    // Crear un nuevo contenedor para las preguntas
    let contenedorPreguntas = document.createElement("div");
    contenedorPreguntas.id = "C_preguntas";
    contenedorPreguntas.className = "contenedor-preguntas"; // Nombre CSS

    // Mostramos las preguntas pasando por todas
    for (let i = indicePreguntaActual; i < indicePreguntaActual + preguntasPorPagina; i++) {
        if (listaPreguntas[i]) {
            let preguntaObjeto = listaPreguntas[i];
            let opcionesDesordenadas = barajar([...preguntaObjeto.opciones]);

            // Crear el contenido de la pregunta
            let preguntaHTML = `
                <div class="pregunta">
                    <p>${i + 1}. ${preguntaObjeto.pregunta}</p>
                    <ul>
                        ${opcionesDesordenadas.map(opcion => `
                            <li>
                                <input type="radio" name="pregunta${i}" value="${opcion}"> ${opcion}
                            </li>`).join('')}
                    </ul>
                </div>
            `;

            // Insertar la pregunta
            contenedorPreguntas.innerHTML += preguntaHTML;
        }
    }

    // Agregamos un boton Comprobar
    contenedorPreguntas.innerHTML += `
        <button id="comprobarRespuestas" class="b_comprobar" onclick="comprobarRespuestas()">Comprobar</button>
    `;

    // Insertar preguntas
    document.body.appendChild(contenedorPreguntas);

    // Actualizar puntuacion, eliminando el anterior
    let puntajeExistente = document.getElementById("puntacion");
    if (puntajeExistente) {
        puntajeExistente.remove();
    }
    let puntajeHTML = document.createElement("p");
    puntajeHTML.id = "puntacion";
    puntajeHTML.textContent = `Puntuación: ${puntaje}`;
    puntajeHTML.className = "puntuacion";
    document.body.appendChild(puntajeHTML);
}

// Funcion Comprobar
const comprobarRespuestas = () => {
    // Verificar las respuestas de las preguntas mostradas actualmente
    for (let i = indicePreguntaActual; i < indicePreguntaActual + preguntasPorPagina; i++) {
        if (listaPreguntas[i]) {
            let preguntaObjeto = listaPreguntas[i];
            let opciones = document.getElementsByName(`pregunta${i}`);
            let respuestaCorrecta = preguntaObjeto.respuesta_correcta;
            let acertada = false;

            // Comprobar si alguna opcion seleccionada es correcta
            opciones.forEach(opcion => {
                if (opcion.checked && opcion.value === respuestaCorrecta) {
                    acertada = true;
                }
            });

            // Si no esta acertada, se termina el juego
            if (!acertada) {
                preguntasFalladas++;
                alert(`La respuesta a la pregunta ${i + 1} no es correcta. Has perdido el juego.`);
                mostrarPuntajeFinal();
                guardarResultados(); // Guardar resultados en el JSON
                return; // Salir del concurso
            } else {
                preguntasAcertadas++;
            }
        }
    }

    // Si todas son correctas, avanzamos a las siguientes preguntas y actualizamos la puntuación
    puntaje += preguntasPorPagina;
    indicePreguntaActual += preguntasPorPagina;

    if (indicePreguntaActual < listaPreguntas.length) {
        mostrarPreguntas();
    } else {
        alert("¡Felicidades! Has completado todas las preguntas.");
        mostrarPuntajeFinal();
        guardarResultados();
    }

    // Actualizar la puntuacion
    document.getElementById("puntacion").textContent = `Puntuación: ${puntaje}`;
}

// Funcion puntuacion final
const mostrarPuntajeFinal = () => {
    let contenedorPreguntas = document.getElementById("C_preguntas");
    contenedorPreguntas.innerHTML = `<h2>Has terminado el concurso. Puntuacion final: ${puntaje}</h2>`;
}

// Funcion para guardar los resultados en un archivo JSON
const guardarResultados = () => {
    const resultados = {
        nombre: nombreJugador,
        preguntas_acertadas: preguntasAcertadas,
        preguntas_falladas: preguntasFalladas,
        gano: indicePreguntaActual >= listaPreguntas.length
    };
    const blob = new Blob([JSON.stringify(resultados, null, 2)], { type: 'application/json' });
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = URL.createObjectURL(blob);
    enlaceDescarga.download = `${nombreJugador}_resultados.json`;
    enlaceDescarga.click();
}