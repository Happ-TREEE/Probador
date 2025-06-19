from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from werkzeug.utils import secure_filename
import os
from controladores.controlador_perfil_Admin import obtener_perfil_admin, actualizar_perfil_admin
from utilidades import autenticacion_requerida

router_perfil_admin = Blueprint('router_perfil_admin', __name__)

@router_perfil_admin.route('/perfil_admin')
@autenticacion_requerida(tipo_usuario=1)
def perfil_admin():
    user_id = session.get('user_id')  # Obtiene el ID del usuario desde la sesión
    perfil = obtener_perfil_admin(user_id)
    
    if perfil:
        return render_template('perfil_admin.html', perfil=perfil)
    else:
        flash("No se pudo obtener el perfil del usuario.", "danger")
        return redirect(url_for('router_login.login'))

@router_perfil_admin.route('/actualizar_perfil_admin', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def actualizar_perfil():
    user_id = session.get('user_id')
    
    nuevo_nombre_usuario = request.form['nombre_usuario']
    nuevo_correo = request.form['correo']
    nueva_contraseña = request.form['contraseña']
    
    # Obtén la foto de perfil si fue subida
    foto_perfil = request.files.get('foto_perfil')
    
    # Actualiza el perfil llamando a la función del controlador
    exito = actualizar_perfil_admin(user_id, nuevo_nombre_usuario, nuevo_correo, nueva_contraseña, foto_perfil)
    
    if exito:
        flash("Perfil actualizado con éxito.", "success")
        return redirect(url_for('router_perfil_admin.perfil_admin'))
    else:
        flash("Error al actualizar el perfil. Inténtalo de nuevo.", "danger")
        return redirect(url_for('router_perfil_admin.perfil_admin'))

