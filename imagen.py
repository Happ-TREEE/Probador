import cv2
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from tkinter import filedialog, Tk
import csv
import os

def guardar_colores_csv(colores, proporciones, nombre_archivo):
    with open(nombre_archivo, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["Color HEX", "RGB", "Proporción"])
        for i in range(len(colores)):
            rgb = colores[i]
            hex_code = '#%02x%02x%02x' % tuple(rgb)
            writer.writerow([hex_code, str(tuple(rgb)), f"{proporciones[i]:.2f}"])

def detectar_colores(imagen_path, n_colores=5):
    imagen = cv2.imread(imagen_path)
    imagen = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)
    imagen = imagen.reshape((-1, 3))

    kmeans = KMeans(n_clusters=n_colores, random_state=42)
    kmeans.fit(imagen)

    colores = kmeans.cluster_centers_.astype(int)
    proporciones = np.bincount(kmeans.labels_) / len(kmeans.labels_)

    # Guardar archivo CSV
    nombre_csv = os.path.splitext(os.path.basename(imagen_path))[0] + "_colores.csv"
    guardar_colores_csv(colores, proporciones, nombre_csv)
    print(f"\nColores guardados en: {nombre_csv}\n")

    # Mostrar colores
    fig, ax = plt.subplots()
    for i in range(n_colores):
        hex_color = '#%02x%02x%02x' % tuple(colores[i])
        ax.bar(i, proporciones[i], color=np.array(colores[i])/255)
        print(f"Color {i+1}: RGB {tuple(colores[i])} | HEX {hex_color} | Proporción: {proporciones[i]:.2f}")
    plt.title("Colores Dominantes")
    plt.xticks([])
    plt.show()

def seleccionar_imagen():
    root = Tk()
    root.withdraw()
    archivo = filedialog.askopenfilename(
        title="Selecciona una imagen",
        filetypes=[("Imágenes", "*.jpg *.jpeg *.png *.bmp")]
    )
    if archivo:
        detectar_colores(archivo)
    else:
        print("No seleccionaste ninguna imagen.")

# Ejecutar
seleccionar_imagen()
