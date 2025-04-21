
/**
 * Añade o quita una clase a un elemento HTML cuando se dispara un evento en otro elemento.
 *
 * @param {HTMLElement} elementoDetonador - El elemento que dispara el evento.
 * @param {HTMLElement} elementoAfectado - El elemento al que se le añade o quita la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a alternar.
 * @param {string} nombreEvento - El nombre del evento que dispara la acción.
 */

export function alternarClasePorEvento(elementoDetonador, elementoAfectado, nombreClase, nombreEvento) {
    elementoDetonador.addEventListener(nombreEvento, () => {

        if (elementoAfectado.classList.contains(nombreClase)) {
            return elementoAfectado.classList.remove(nombreClase);
        }

        return elementoAfectado.classList.add(nombreClase);
    });
}


/**
 * Quita una clase de un grupo de elementos HTML.
 *
 * @param {NodeList} elementosAfectados - Conjunto de elementos al los que se le quita la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a quitar.
 */

export function quitarClaseAElementos(elementosAfectados, nombreClase) {
    elementosAfectados.forEach(elemento => {
        if (elemento.classList.contains(nombreClase)) {
            elemento.classList.remove(nombreClase);
        }
    });
}


/**
 * Añade una clase a un elemento HTML y quita esa clase a los demás elementos del mismo grupo.
 *
 * @param {NodeList} elementosAfectados - Conjunto de elementos al los que se le quita la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a añadir al elemento y quitar a los demás elementos.
 * @param {string} nombreEvento - El nombre del evento que dispara la acción.
 */

export function activarUnoDelGrupo(elementosAfectados, nombreClase, nombreEvento) {
    const estadoActivo = sessionStorage.getItem('activeLink');

    if (estadoActivo) {
        elementosAfectados.forEach(elemento => {
            if (elemento.href === estadoActivo) {
                elemento.classList.add(nombreClase);
            }
        });
    }

    elementosAfectados.forEach(elemento => {
        elemento.addEventListener(nombreEvento, () => {
            elementosAfectados.forEach(e => e.classList.remove(nombreClase));
            elemento.classList.add(nombreClase);
            sessionStorage.setItem('activeLink', elemento.href);
        });
    });
}