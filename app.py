from flask import Flask, render_template, request, send_from_directory
import os
import cv2
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import csv

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'static/resultados'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

def analizar_colores(path_imagen, nombre_base, n_colores=5):
    imagen = cv2.imread(path_imagen)
    imagen = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)
    datos = imagen.reshape((-1, 3))

    kmeans = KMeans(n_clusters=n_colores)
    kmeans.fit(datos)

    colores = kmeans.cluster_centers_.astype(int)
    proporciones = np.bincount(kmeans.labels_) / len(kmeans.labels_)

    resultado = []
    for i, color in enumerate(colores):
        hex_color = '#%02x%02x%02x' % tuple(color)
        resultado.append({
            'hex': hex_color,
            'rgb': tuple(color),
            'proporcion': f"{proporciones[i]:.2f}"
        })

    # Crear paleta visual como imagen
    paleta_path = os.path.join(RESULT_FOLDER, f"{nombre_base}_paleta.png")
    crear_paleta_visual(colores, proporciones, paleta_path)

    return resultado, os.path.basename(paleta_path)

def crear_paleta_visual(colores, proporciones, output_path):
    fig, ax = plt.subplots(figsize=(8, 2))
    ax.axis('off')

    inicio = 0
    for color, prop in zip(colores, proporciones):
        hex_color = '#%02x%02x%02x' % tuple(color)
        ax.add_patch(plt.Rectangle((inicio, 0), prop, 1, color=np.array(color)/255))
        ax.text(inicio + prop / 2, 0.5, hex_color, ha='center', va='center', fontsize=9,
                color='white' if np.mean(color) < 128 else 'black')
        inicio += prop

    plt.xlim(0, 1)
    plt.ylim(0, 1)
    plt.savefig(output_path, bbox_inches='tight')
    plt.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/procesar', methods=['POST'])
def procesar():
    imagen = request.files['imagen']
    if not imagen:
        return "No se seleccionó ninguna imagen."

    nombre = imagen.filename
    path_imagen = os.path.join(UPLOAD_FOLDER, nombre)
    imagen.save(path_imagen)

    base = os.path.splitext(nombre)[0]
    colores, paleta_file = analizar_colores(path_imagen, base)

    return render_template("index.html",
                           colores=colores,
                           imagen_nombre=nombre,
                           paleta_img=paleta_file)

@app.route('/descargar/<archivo>')
def descargar(archivo):
    return send_from_directory(RESULT_FOLDER, archivo)

@app.route('/imagen/<nombre>')
def ver_imagen(nombre):
    return send_from_directory(UPLOAD_FOLDER, nombre)

if __name__ == '__main__':
    app.run(debug=True)
