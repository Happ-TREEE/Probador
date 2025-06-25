from flask import Blueprint, render_template, request, jsonify, redirect, url_for, current_app, g
from controladores.controlador_perfil_admin import (
    allowed_file,
    guardar_imagen_perfil,
    obtener_perfil_admin,
    actualizar_perfil_admin,
    cambiar_foto_perfil,
    verificar_password_actual
)
from utilidades import autenticacion_requerida
import os

router_perfil_admin = Blueprint('router_perfil_admin', __name__)

@router_perfil_admin.route('/mi_perfil_admin')
@autenticacion_requerida(tipo_usuario=1)
def mi_perfil():
    username = g.usuario[1]
    perfil = obtener_perfil_admin(username)
    
    if not perfil:
        return redirect(url_for('inicio_admin'))
    
    # Construir ruta de la foto de perfil con verificación
    if perfil[3] and perfil[3] != 'icon_rounded_user_white.svg':
        ruta_imagen = os.path.join(current_app.root_path, 'static', 'img', 'perfil_usuario', perfil[3])
        if os.path.exists(ruta_imagen):
            foto_perfil = url_for('static', filename=f'img/perfil_usuario/{perfil[3]}')
        else:
            foto_perfil = url_for('static', filename='img/iconos/icon_rounded_user_white.svg')
    else:
        foto_perfil = url_for('static', filename='img/iconos/icon_rounded_user_white.svg')
    
    return render_template('mi_perfil_admin.html', 
                         perfil=perfil,
                         foto_perfil=foto_perfil)

@router_perfil_admin.route('/actualizar_perfil_admin', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def actualizar_perfil():
    """Maneja la actualización de datos básicos y contraseña"""
    username = g.usuario[1]
    datos = request.form.to_dict()
    
    datos_actualizacion = {}
    
    # Procesar campos básicos
    if 'username' in datos and datos['username'] != username:
        datos_actualizacion['nuevo_username'] = datos['username']
    
    if 'correo' in datos:
        datos_actualizacion['correo'] = datos['correo']
    
    # Procesar cambio de contraseña
    if 'nueva_password' in datos and datos['nueva_password']:
        if not verificar_password_actual(username, datos.get('password_actual', '')):
            return jsonify({'success': False, 'message': 'La contraseña actual es incorrecta'}), 400
        
        if datos['nueva_password'] != datos.get('confirmar_password', ''):
            return jsonify({'success': False, 'message': 'Las contraseñas nuevas no coinciden'}), 400
        
        datos_actualizacion['nueva_password'] = datos['nueva_password']
    
    # Actualizar perfil si hay cambios
    if datos_actualizacion:
        if actualizar_perfil_admin(username, datos_actualizacion):
            perfil_actualizado = obtener_perfil_admin(datos_actualizacion.get('nuevo_username', username))
            
            response = {
                'success': True, 
                'message': 'Perfil actualizado correctamente',
                'data': {
                    'username': perfil_actualizado[1],
                    'correo': perfil_actualizado[2]
                }
            }
            
            if 'nuevo_username' in datos_actualizacion:
                response['reload'] = True
                
            return jsonify(response)
    
    return jsonify({'success': False, 'message': 'No se realizaron cambios'}), 400

@router_perfil_admin.route('/actualizar_foto_perfil', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def actualizar_foto_perfil():
    username = g.usuario[1]
    
    if 'foto_perfil' not in request.files:
        current_app.logger.error("No se recibió archivo")
        return jsonify({'success': False, 'message': 'No se proporcionó archivo'}), 400
    
    archivo_foto = request.files['foto_perfil']
    
    if archivo_foto.filename == '':
        current_app.logger.error("Nombre de archivo vacío")
        return jsonify({'success': False, 'message': 'Nombre de archivo vacío'}), 400
    
    # Validar tipo de archivo
    if not allowed_file(archivo_foto.filename):
        current_app.logger.error(f"Tipo de archivo no permitido: {archivo_foto.filename}")
        return jsonify({'success': False, 'message': 'Tipo de archivo no permitido'}), 400
    
    # Procesar la imagen
    nombre_archivo = cambiar_foto_perfil(username, archivo_foto)
    
    if nombre_archivo:
        # Obtener URL completa para la respuesta
        foto_url = url_for('static', filename=f'img/perfil_usuario/{nombre_archivo}')
        return jsonify({
            'success': True,
            'message': 'Foto de perfil actualizada',
            'foto_perfil': foto_url,
            'nombre_archivo': nombre_archivo
        })
    
    return jsonify({'success': False, 'message': 'Error al actualizar foto'}), 500

@router_perfil_admin.route('/eliminar_foto_perfil', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_foto_perfil():
    username = g.usuario[1]
    perfil = obtener_perfil_admin(username)
    
    if perfil and perfil[3]:  # Si tiene foto de perfil
        try:
            # RUTA CORREGIDA
            ruta_foto = os.path.join(current_app.root_path, 'static', 'img', 'perfil_usuario', perfil[3])
            if os.path.exists(ruta_foto):
                os.remove(ruta_foto)
                current_app.logger.info(f"Foto eliminada: {perfil[3]}")
            
            # Actualizar base de datos
            if actualizar_perfil_admin(username, {'foto_perfil': None}):
                return jsonify({'success': True, 'message': 'Foto de perfil eliminada'})
        except Exception as e:
            current_app.logger.error(f"Error al eliminar foto de perfil: {e}")
    
    return jsonify({'success': False, 'message': 'Error al eliminar la foto'}), 500
