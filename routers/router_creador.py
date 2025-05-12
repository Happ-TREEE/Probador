from flask import Blueprint, jsonify
import os
import json

router_creador = Blueprint('router_creador', __name__)

@router_creador.route('/api/productos_con_colores')
def productos_con_colores():
    BASE_PATH = 'static/img/creador'
    COLORES_JSON = 'colores.json'
    resultado = []

    try:
        with open(COLORES_JSON, 'r', encoding='utf-8') as f:
            mapa_colores = json.load(f)
    except Exception as e:
        print(f"Error cargando colores.json: {e}")
        mapa_colores = {}

    if not os.path.exists(BASE_PATH):
        return jsonify([])

    for categoria in os.listdir(BASE_PATH):
        ruta_categoria = os.path.join(BASE_PATH, categoria)
        if not os.path.isdir(ruta_categoria):
            continue

        colores_categoria = []
        imagen_blanco = None

        for color in os.listdir(ruta_categoria):
            ruta_color = os.path.join(ruta_categoria, color)
            if not os.path.isdir(ruta_color):
                continue

            archivos = os.listdir(ruta_color)
            imagen_frente = next((f for f in archivos if 'frente' in f.lower()), None)
            if not imagen_frente:
                continue

            ruta_img = f"/static/img/creador/{categoria}/{color}/{imagen_frente}".replace('\\', '/')
            hex_code = mapa_colores.get(color, "#000000")

            # Guardar imagen blanca como principal
            if color.lower() == "blanco":
                imagen_blanco = ruta_img

            colores_categoria.append({
                'nombre': color,
                'color_hex': hex_code
            })

        # Solo incluir categoría si tiene imagen blanca
        if imagen_blanco:
            resultado.append({
                'categoria': categoria,
                'imagen_blanco': imagen_blanco,
                'colores': colores_categoria
            })

    return jsonify(resultado)

@router_creador.route('/api/diseno_categorias')
def diseno_categorias():
    base_path = 'static/img/accesorio'
    categorias = []

    if os.path.exists(base_path):
        for nombre in os.listdir(base_path):
            ruta_categoria = os.path.join(base_path, nombre)
            if os.path.isdir(ruta_categoria):
                imagenes = [
                    f"/static/img/accesorio/{nombre}/{img}"
                    for img in os.listdir(ruta_categoria)
                    if img.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
                ]
                categorias.append({
                    "nombre": nombre.replace('_', ' ').capitalize(),
                    "imagenes": imagenes[:6]  # solo las primeras 6 imágenes
                })

    return jsonify(categorias)