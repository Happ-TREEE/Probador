const input = document.getElementById('imageInput');
const img = document.getElementById('uploadedImage');
const colorThief = new ColorThief();
const colorDisplay = document.getElementById('colorDisplay');
const btn = document.getElementById('btn');

let color1RGB = ''; // Definimos fuera para usar después
let color2RGB = '';
let color3RGB = ''; 

input.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

img.onload = function () {
    if (img.complete) {
        // Obtener la paleta de 3 colores
        const palette = colorThief.getPalette(img, 7); // 3 colores
        const [r1, g1, b1] = palette[0]; //Primer color
        const [r2, g2, b2] = palette[1];
        const [r3, g3, b3] = palette[2];
        const [r4, g4, b4] = palette[3];
        const [r5, g5, b5] = palette[4];
        const [r6, g6, b6] = palette[5];
        const [r7, g7, b7] = palette[6];
         

        // Guardamos como string para usar en el botón
        color1RGB = `rgb(${r1}, ${g1}, ${b1})`;
        color2RGB = `rgb(${r2}, ${g2}, ${b2})`;
        color3RGB = `rgb(${r3}, ${g3}, ${b3})`;
        color4RGB = `rgb(${r4}, ${g4}, ${b4})`;
        color5RGB = `rgb(${r5}, ${g5}, ${b5})`;
        color6RGB = `rgb(${r6}, ${g6}, ${b6})`;
        color7RGB = `rgb(${r7}, ${g7}, ${b7})`;

        // Limpiar el display previo de colores
        colorDisplay.innerHTML = '';

        // Mostrar los colores en el HTML
        palette.forEach((color, index) => {
            const colorBox = document.createElement('div');
            colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorBox.style.width = '100px';
            colorBox.style.height = '100px';
            colorBox.style.display = 'inline-block';
            colorBox.style.margin = '10px';
            colorDisplay.appendChild(colorBox);

            console.log(`Color ${index + 1}: rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        });
    }
};

// Botón para cambiar el color CSS
btn.addEventListener('click', () => {
    if (color1RGB) {
        document.documentElement.style.setProperty('--color-primario', color1RGB);
        document.documentElement.style.setProperty('--color-secundario', color2RGB);
        document.documentElement.style.setProperty('--color-terciario', color3RGB);
        document.documentElement.style.setProperty('--color-terciario', color3RGB);
        console.log('Colores actualizados:', {
            primario: color1RGB,
            secundario: color2RGB,
            terciario: color3RGB
        });
    } else {
        alert('Primero selecciona una imagen.');
    }
});