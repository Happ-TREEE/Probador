document.addEventListener('DOMContentLoaded', () => {
    const titleImage = document.querySelector('.prod__view__span');
    const navLeft = document.querySelector('.prod-view__btn-nav-img--left');
    const navRight = document.querySelector('.prod-view__btn-nav-img--right');
    const images = document.querySelectorAll('.prod-view__nav-img .prod-view__img');
    const thumbs = document.querySelectorAll('.prod-view__thumbs .prod-view__img');
    let currentImageIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentImageIndex = images.length - 1;
        } else if (index >= images.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }
        console.log(index);
        switch (index) {
            case 0:
            case 4:
                titleImage.textContent = 'Frente';
                break;
            case 1:
                titleImage.textContent = 'Izquierda';
                break;
            case 2:
                titleImage.textContent = 'Derecha';
                break;
            case 3:
                titleImage.textContent = 'Espalda';
                break;
            default:
                titleImage.textContent = 'Prenda';
                break;
        }

        images.forEach((img, i) => {
            if (i === currentImageIndex) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });

        thumbs.forEach((thumb, i) => {
            thumb.classList.remove('prod-view__img--active');
            if (i === currentImageIndex) {
                thumb.classList.add('prod-view__img--active');
            }
        });
    }

    navLeft.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    navRight.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showImage(index);
        });
    });

    showImage(currentImageIndex);
});
