document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.admin-nav');
    const btnNavHeader = document.querySelector('#btnNavHeader');
    const stateNavCollapse = "admin-nav--collapse";

    if (btnNavHeader) {
        btnNavHeader.addEventListener('click', () => {
            nav.classList.toggle(stateNavCollapse);
        });
    }
});