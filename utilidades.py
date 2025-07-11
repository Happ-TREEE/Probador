from functools import wraps
from flask import g, request, render_template, current_app
import controladores.controlador_usuario as controlador_usuario
from PIL import Image
import os
import uuid


def autenticacion_requerida(tipo_usuario=None):
    def decorador(f):
        @wraps(f)
        def funcion_envuelta(*args, **kwargs):
            username = request.cookies.get('username')
            token = request.cookies.get('token')
            if not username or not token:
                return render_template('login.html')
            
            usuario = controlador_usuario.obtener_usuario_por_username(username)
            if not usuario:
                return render_template('login.html')

            token_valido = usuario[3] == token
            tipo_valido = tipo_usuario is None or usuario[4] == tipo_usuario

            if token_valido and tipo_valido:
                return f(*args, **kwargs)

            return render_template('login.html')
        return funcion_envuelta
    return decorador

def obtener_usuario_logeado():
    username = request.cookies.get('username')
    token = request.cookies.get('token')
    
    if username and token:
        usuario = controlador_usuario.obtener_usuario_sin_password(username)
        if usuario and usuario[2] == token:
            g.usuario = usuario
            return
    
    g.usuario = None

def guardar_imagen_webp(imagen_file):
    imagen = Image.open(imagen_file).convert("RGBA")
    nombre_archivo = f"{uuid.uuid4().hex}.webp"
    ruta_guardado = os.path.join(current_app.root_path, "static", "img", "catalogo", nombre_archivo)
    imagen.save(ruta_guardado, "WEBP", quality=80)
    return nombre_archivo

def guardar_imagen_webp_perfil(imagen_file):
    imagen = Image.open(imagen_file).convert("RGBA")
    nombre_archivo = f"{uuid.uuid4().hex}.webp"
    ruta_guardado = os.path.join(current_app.root_path, "static", "img", "perfil_usuario", nombre_archivo)
    imagen.save(ruta_guardado, "WEBP", quality=80)
    return nombre_archivo

def redimensionar_imagen(imagen_file):
    imagen = Image.open(imagen_file)
    imagen = imagen.resize((30, 30))  # Redimensionar a 30x30 píxeles
    nombre_archivo = f"{uuid.uuid4().hex}.webp"
    ruta_guardado = os.path.join(current_app.root_path, "static", "img", "perfil_usuario", nombre_archivo)
    imagen.save(ruta_guardado, "WEBP", quality=80)
    return nombre_archivo