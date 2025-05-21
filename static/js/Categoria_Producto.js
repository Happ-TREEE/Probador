function cargarCategoriaProducto(btn) {
  const form = document.getElementById('categoriaProductoForm');
  form.action = '/gestionar_categoria_producto/editar/' + btn.dataset.id;
  document.getElementById('modalCategoriaProductoLabel').textContent = 'Editar Categoría de Producto';
  document.getElementById('btnGuardarCategoriaProducto').textContent = 'Actualizar';

  form.nombre.value = btn.dataset.nombre;
  form.vigencia.checked = btn.dataset.vigencia === 'on';
}

function resetFormularioCategoriaProducto() {
  const form = document.getElementById('categoriaProductoForm');
  form.reset();
  form.action = '/gestionar_categoria_producto/crear';
  document.getElementById('modalCategoriaProductoLabel').textContent = 'Registrar Categoría de Producto';
  document.getElementById('btnGuardarCategoriaProducto').textContent = 'Guardar';
}

var confirmDeleteModalCategoriaProducto = document.getElementById('confirmDeleteModalCategoriaProducto')
confirmDeleteModalCategoriaProducto.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget
  var idCategoria = button.getAttribute('data-id')
  var form = document.getElementById('deleteFormCategoriaProducto')
  form.action = '/gestionar_categoria_producto/eliminar/' + idCategoria
})
