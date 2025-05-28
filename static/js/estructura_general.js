/*----------------------------------- Diseño de Mantenimiento ---------------------------------------*/
function cargarPedido(btn) {
  const form = document.getElementById('pedidoForm');
  form.action = '/gestionar_pedido/editar/' + btn.dataset.id;
  document.getElementById('modalPedidoLabel').textContent = 'Editar Pedido';
  document.getElementById('btnGuardarPedido').textContent = 'Actualizar';

  form.fecha_registro.value = btn.dataset.fecha_registro;
  form.fecha_envio.value = btn.dataset.fecha_envio;
  form.fecha_entrega.value = btn.dataset.fecha_entrega;

  const select = form.id_persona;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value == btn.dataset.id_persona) {
      select.selectedIndex = i;
      break;
    }
  }
}

function resetFormularioPedido() {
  const form = document.getElementById('pedidoForm');
  form.reset();
  form.action = '/gestionar_pedido/crear';
  document.getElementById('modalPedidoLabel').textContent = 'Registrar Pedido';
  document.getElementById('btnGuardarPedido').textContent = 'Guardar';
}

var confirmDeleteModalPedido = document.getElementById('confirmDeleteModalPedido');
confirmDeleteModalPedido.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  var idPedido = button.getAttribute('data-id');
  var form = document.getElementById('deleteFormPedido');
  form.action = '/gestionar_pedido/eliminar/' + idPedido;
});


/*----------------------------------- Diseño de Reportes ---------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  // Botón regresar en reportes
  const btnRegresar = document.querySelector('a.btn.btn-secondary');
  if (btnRegresar) {
    btnRegresar.addEventListener('click', (e) => {
      // Aquí podrías agregar navegación SPA o prevenir recarga si quieres
    });
  }

  // Manejo menú lateral (botón colapsar)
  const btnCollapse = document.getElementById('btnButtonCollapse');
  const navBar = document.getElementById('navBar');
  if (btnCollapse && navBar) {
    btnCollapse.addEventListener('click', () => {
      navBar.classList.toggle('admin-nav--active');
    });
  }

  // Marcar item activo del menú según URL actual
  const navLinks = navBar ? navBar.querySelectorAll('.admin-nav__link') : [];
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Inicialización de DataTables (usando jQuery, asegúrate que jQuery y DataTables estén cargados)
  if (window.jQuery && $.fn.DataTable) {
    $('#tablaPedidos').DataTable({
      dom: 'Bfrtip',
      buttons: ['copy', 'excel', 'print'],
      language: {
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        paginate: {
          previous: "Anterior",
          next: "Siguiente"
        },
        zeroRecords: "No se encontraron registros"
      }
    });
  }
});


