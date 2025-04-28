
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
 * Añadir una clase a un elemento HTML.
 *
 * @param {NodeList} elementoAfectado - Elemento HTML al que se le añadirá la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a añadir.
 */

export function añadirClaseAElemento(elementoAfectado, nombreClase) {
  if (!elementoAfectado.classList.contains(nombreClase)) {
    return elementoAfectado.classList.add(nombreClase);
  }
}


/**
 * Quita una clase a un elemento HTML.
 *
 * @param {NodeList} elementoAfectado - Elemento HTML al que se le quita la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a quitar.
 */

export function quitarClaseAElemento(elementoAfectado, nombreClase) {
  if (elementoAfectado.classList.contains(nombreClase)) {
    elementoAfectado.classList.remove(nombreClase);
  }
}


/**
 * Quita una clase de un grupo de elementos HTML.
 *
 * @param {NodeList} elementosAfectados - Conjunto de elementos al los que se le quita la clase.
 * @param {string} nombreClase - El nombre de la clase que se va a quitar.
 */

export function quitarClaseAGrupoElementos(elementosAfectados, nombreClase) {
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
  let activo = null;

  elementosAfectados.forEach(elemento => {
    elemento.addEventListener(nombreEvento, () => {
      if (activo) {
        activo.classList.remove(nombreClase);
      }
      elemento.classList.add(nombreClase);

      activo = elemento;
    });
  });
}


/**
 * Inicializa una tabla HTML como DataTable con filtros por columna, botones de exportación,
 * configuración en español y soporte responsive.
 *
 * @param {HTMLElement|jQuery} elemento - El elemento HTML o jQuery que representa la tabla a inicializar.
 * @returns {DataTables.Api} Instancia del DataTable creada, por si se necesita manipulación posterior.
 */
export function inicializarDataTableConFiltros(elemento) {
  const $tabla = $(elemento);

  const dataTable = $tabla.DataTable({
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      zeroRecords: "No se encontraron resultados"
    },
    responsive: true,
    dom: '<"top"lfB>rt<"bottom"ip><"clear">',
    buttons: ['copy', 'pdf', 'print'],
    paging: true,
    searching: true,
    ordering: true,
    pageLength: 5,
    lengthMenu: [5, 10, 15, 20, 25],
    columnDefs: [
      { targets: -1, orderable: false }
    ]
  });

  $tabla.find('tfoot th').each(function (index) {
    const input = $(this).find('input');
    if (input.length) {
      input.on('keyup change clear', function () {
        if (dataTable.column(index).search() !== this.value) {
          dataTable.column(index).search(this.value).draw();
        }
      });
    }
  });

  return dataTable;
}
