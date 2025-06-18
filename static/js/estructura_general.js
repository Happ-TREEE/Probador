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
$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaPedidos').DataTable({
        dom: 'Bfrtip',
        pageLength: 6,
        buttons: [
            {
                extend: 'copy',
                text: '<i class="fas fa-copy"></i> Copiar',
                title: 'Reporte de Pedidos y Pagos',
                exportOptions: {
                    columns: ':visible'
                },
                action: function (e, dt, node, config) {
                    dt.buttons.exportData({
                        modifier: {
                            page: 'all'
                        }
                    });
                    
                    $.fn.dataTable.ext.buttons.copyHtml5.action.call(this, e, dt, node, config);
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Copiado al portapapeles',
                        text: 'Se copiaron los datos al portapapeles.',
                        timer: 2500,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'center',
                        backdrop: true
                    });
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i> Excel',
                title: 'Reporte de Pedidos y Pagos',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i> Imprimir',
                title: 'Reporte de Pedidos y Pagos',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            paginate: {
                previous: "Anterior",
                next: "Siguiente"
            },
            zeroRecords: "No se encontraron registros"
        },
        drawCallback: function(settings) {
            updatePaginationInfo();
            updatePaginationButtons();
        }
    });

    // Funcionalidad de búsqueda en tiempo real
    $('#buscarID').on('input', function() {
        table.search(this.value).draw();
    });

    // Conectar botones personalizados con DataTables
    $('#copyButton').click(function() {
        table.button('.buttons-copy').trigger();
    });
    
    $('#excelButton').click(function() {
        table.button('.buttons-excel').trigger();
    });
    
    $('#printButton').click(function() {
        table.button('.buttons-print').trigger();
    });

    // Funcionalidad de paginación personalizada
    $('#pagination-buttons .btn:first-child').click(function() {
        table.page('previous').draw('page');
    });
    
    $('#pagination-buttons .btn:last-child').click(function() {
        table.page('next').draw('page');
    });

    // Actualizar información de paginación
    function updatePaginationInfo() {
        var info = table.page.info();
        var start = info.start + 1;
        var end = info.end;
        var total = info.recordsDisplay;
        var currentPage = info.page + 1;
        var totalPages = info.pages;
        
        // Manejar caso cuando no hay registros
        if(total === 0) {
            start = 0;
            end = 0;
        }
        
        $('#pagination-info').text(
            `Mostrando ${start} a ${end} de ${total} registros`
        );
        
        // Actualizar número de página en el botón central
        $('#pagination-buttons .btn:nth-child(2)').text(currentPage);
    }

    // Actualizar estado de botones de paginación
    function updatePaginationButtons() {
        var info = table.page.info();
        
        // Deshabilitar botón "Anterior" si estamos en la primera página
        if(info.page === 0) {
            $('#pagination-buttons .btn:first-child').prop('disabled', true);
        } else {
            $('#pagination-buttons .btn:first-child').prop('disabled', false);
        }
        
        // Deshabilitar botón "Siguiente" si estamos en la última página
        if(info.page === info.pages - 1 || info.pages === 0) {
            $('#pagination-buttons .btn:last-child').prop('disabled', true);
        } else {
            $('#pagination-buttons .btn:last-child').prop('disabled', false);
        }
    }

    // Inicializar paginación
    updatePaginationInfo();
    updatePaginationButtons();
});