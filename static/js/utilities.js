
/**
 * Añade o quita una clase a un elemento HTML cuando se dispara un evento en otro elemento.
 *
 * @param {HTMLElement} elemento_detonador - El elemento que dispara el evento.
 * @param {HTMLElement} elemento_afectado - El elemento al que se le añade o quita la clase.
 * @param {string} nombre_clase - El nombre de la clase que se va a alternar.
 * @param {string} nombre_evento - El nombre del evento que dispara la acción.
 */

export function añadir_quitar_clase_por_evento(elemento_detonador, elemento_html_afectado, nombre_clase, nombre_evento) {
    elemento_detonador.addEventListener(nombre_evento, () => {

        if (elemento_html_afectado.className.includes(nombre_clase)) {
            return elemento_html_afectado.classList.remove(nombre_clase);
        }

        return elemento_html_afectado.classList.add(nombre_clase);
    });
}