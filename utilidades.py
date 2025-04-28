from functools import wraps
from flask import request, redirect, render_template, url_for
import controladores.controlador_usuario as controlador_usuario

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