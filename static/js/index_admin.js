$(document).ready(function () {
    // Sidebar toggle
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active'); // Activa o desactiva la clase active para colapsar
    });

    // Activar la clase active en los ítems del menú
    $('.admin-sidebar .components li').on('click', function() {
        $('.admin-sidebar .components li').removeClass('active');
        $(this).addClass('active');
    });

    // Comportamiento responsivo
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('#sidebar').addClass('active');  // Agregar clase active cuando es menor a 768px
            $('.admin-username').hide(); // Ocultar nombre del usuario en pantallas pequeñas
        } else {
            $('#sidebar').removeClass('active');
            $('.admin-username').show(); // Mostrar nombre del usuario en pantallas grandes
        }
    });

    // Inicializar con el estado correcto
    if ($(window).width() < 768) {
        $('#sidebar').addClass('active');
        $('.admin-username').hide(); // Ocultar nombre del usuario si es pantalla pequeña
    }
    
});
