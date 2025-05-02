
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


/**
 * Muestra un modal con un mensaje personalizado y un icono correspondiente según el tipo.
 * 
 * @function
 * @param {string} type - El tipo de modal que se debe mostrar. Puede ser uno de los siguientes valores:
 *   - 'success' para un modal de éxito.
 *   - 'error' para un modal de error.
 *   - 'information' para un modal de información.
 *   - 'question' para un modal de pregunta.
 * 
 * @param {string} text - El texto que se mostrará dentro del modal. Este puede ser un mensaje que el usuario debe ver.
 * 
 * @returns {Promise<{ confirmado: boolean, accion: 'aceptar' | 'cerrar' }>} 
 * Una promesa que se resuelve con un objeto indicando si el usuario confirmó la acción
 * y qué botón presionó.
 * 
 * @example
 * const resultado = await mostrarModal('question', '¿Desea continuar?');
 * if (resultado.confirmado) {
 *   // Acción confirmada
 * }
 */
export function mostrarModal(type, text) {
  return new Promise((resolve) => {
    const modalGeneral = document.querySelector('#modalGeneral');
    const btnModalAceptar = document.querySelector('#btnModalAceptar');
    const btnModalCerrar = document.querySelector('#btnModalCerrar');
    const modalText = document.querySelector('#modalText');
    const modalImg = document.querySelector('#modalImg');

    const modalImgSuccess = "dialog__img--success";
    const modalImgError = "dialog__img--error";
    const modalImgQuestion = "dialog__img--question";
    const modalImgInformation = "dialog__img--information";

    modalText.textContent = text;
    btnModalAceptar.style.display = 'none';

    [modalImgSuccess, modalImgError, modalImgQuestion, modalImgInformation].forEach(type_img => {
      modalImg.classList.remove(type_img);
    });

    switch (type) {
      case 'success':
          modalImg.classList.add(modalImgSuccess);
          break;
      case 'error':
          modalImg.classList.add(modalImgError);
          break;
      case 'information':
          modalImg.classList.add(modalImgInformation);
          break;
      case 'question':
          modalImg.classList.add(modalImgQuestion);
          btnModalAceptar.style.display = 'inline-block';
          break;
      default:
          modalImg.classList.add(modalImgInformation);
          break;
  }

    modalGeneral.showModal();

    const onAccept = () => {
      cleanup();
      resolve({ confirmado: true, accion: 'aceptar' });
    };

    const onClose = () => {
      cleanup();
      resolve({ confirmado: false, accion: 'cerrar' });
    };

    function cleanup() {
      btnModalAceptar.removeEventListener('click', onAccept);
      btnModalCerrar.removeEventListener('click', onClose);
      modalGeneral.close();
    }

    btnModalAceptar.addEventListener('click', onAccept);
    btnModalCerrar.addEventListener('click', onClose);
  });
}

