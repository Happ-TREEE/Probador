// Inicialización del mapa
function initMap() {
    var map = L.map('map').setView([40.7128, -74.0060], 13); // Coordenadas de ejemplo (Nueva York)

    // Agregar capa del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar marcador en el mapa
    L.marker([40.7128, -74.0060]).addTo(map)
        .bindPopup("<b>Ubicación de nuestra tienda</b><br>Dirección: Calle Ejemplo 123, Ciudad, País")
        .openPopup();
}

// Llamar a la función para inicializar el mapa cuando la página cargue
window.onload = function() {
    initMap();
};
