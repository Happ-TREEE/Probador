// app.js

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.sidebar-btn');
    const contentArea = document.getElementById('contentArea');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            loadSection(section);
        });
    });

    function loadSection(section) {
        switch (section) {
            case 'producto':
                import('./producto.js').then(module => module.loadProducto()); 
                break;
            case 'subidas':
                import('./subidas.js').then(module => module.loadSubidas()); 
                break;
            case 'texto':
                import('./texto.js').then(module => module.loadTexto());
                break;
            case 'disenos':
                import('./disenos.js').then(module => module.loadDisenos());
                break;
            case 'capas':
                import('./capas.js').then(module => module.loadCapas()); 
                break;
        }
    }
});
