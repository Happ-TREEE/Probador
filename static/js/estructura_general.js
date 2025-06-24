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
