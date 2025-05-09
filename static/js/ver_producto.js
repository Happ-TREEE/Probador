document.addEventListener('DOMContentLoaded', () => {
    // Cambiar la clase activa de las opciones de talla
    const sizeOptions = document.querySelectorAll('.prod-view__item-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Eliminar la clase activa de todas las opciones
            sizeOptions.forEach(item => item.classList.remove('prod-view__item-option--active-size'));
            // Añadir la clase activa a la opción seleccionada
            this.classList.add('prod-view__item-option--active-size');
        });
    });

    // Cambiar la clase activa de las opciones de color
    const colorOptions = document.querySelectorAll('.prod-view__item-list--colors .prod-view__item-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Eliminar la clase activa de todos los colores
            colorOptions.forEach(item => item.classList.remove('prod-view__item-option--active-color'));
            // Añadir la clase activa al color seleccionado
            this.classList.add('prod-view__item-option--active-color');
        });
    });

    // Slider para las imágenes
    const navLeft = document.querySelector('.prod-view__btn-nav-img--left');
    const navRight = document.querySelector('.prod-view__btn-nav-img--right');
    const images = document.querySelectorAll('.prod-view__nav-img .prod-view__img');
    const thumbs = document.querySelectorAll('.prod-view__thumbs .prod-view__img');
    let currentImageIndex = 0;

    // Función para mostrar la imagen actual
    function showImage(index) {
        // Asegurarse de que el índice no esté fuera del rango
        if (index < 0) {
            currentImageIndex = images.length - 1;  // Si el índice es menor que 0, vamos a la última imagen
        } else if (index >= images.length) {
            currentImageIndex = 0;  // Si el índice excede el número de imágenes, volvemos a la primera
        } else {
            currentImageIndex = index;
        }

        // Deslizar la imagen principal
        images.forEach((img, i) => {
            img.style.transform = `translateX(-${currentImageIndex * 100}%)`;  // Desplazamiento de las imágenes
        });

        // Marcar la miniatura activa
        thumbs.forEach((thumb, i) => {
            thumb.classList.remove('prod-view__img--active');  // Eliminar la clase activa de todas las miniaturas
            if (i === currentImageIndex) {
                thumb.classList.add('prod-view__img--active');  // Añadir la clase activa a la miniatura correspondiente
            }
        });
    }

    // Mover a la imagen anterior (botón izquierdo)
    navLeft.addEventListener('click', () => {
        showImage(currentImageIndex - 1);  // Desplazarse hacia la imagen anterior
    });

    // Mover a la imagen siguiente (botón derecho)
    navRight.addEventListener('click', () => {
        showImage(currentImageIndex + 1);  // Desplazarse hacia la imagen siguiente
    });

    // Función para manejar el clic en las miniaturas
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showImage(index);  // Mostrar la imagen correspondiente al índice de la miniatura
        });
    });

    // Inicializar la vista de la imagen al primer índice
    showImage(currentImageIndex);
});