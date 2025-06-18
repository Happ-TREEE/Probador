from flask import Blueprint, render_template, request, redirect, url_for, flash
import controladores.controlador_perfil_Admin as controlador_perfil_Admin
from utilidades import autenticacion_requerida

router_perfil_admin = Blueprint('perfil_admin', __name__)


@router_perfil_admin.route('/perfil_admin/<int:user_id>', methods=['GET'])
@autenticacion_requerida(tipo_usuario=1)
def ver_perfil(user_id):
    perfil = controlador_perfil_Admin.obtener_perfil_admin(user_id)
    return render_template("/perfil_admin.html", perfil=perfil)


@router_perfil_admin.route('/actualizar/<int:user_id>', methods=['GET', 'POST'])
@autenticacion_requerida(tipo_usuario=1)
def actualizar_perfil(user_id):
    if request.method == 'POST':
  
        nuevo_nombre_usuario = request.form['nombre_usuario']
        nuevo_correo = request.form['correo']
        nueva_contraseña = request.form['contraseña']
        foto_perfil = request.files.get('foto_perfil') 
        
  
        exito = controlador_perfil_Admin.actualizar_perfil_admin(
            user_id, nuevo_nombre_usuario, nuevo_correo, nueva_contraseña, foto_perfil
        )
        
        if exito:
            flash('Perfil actualizado exitosamente', 'success')
            return redirect(url_for('perfil_admin.ver_perfil', user_id=user_id))
        else:
            flash('Error al actualizar el perfil', 'danger')
    
  
    perfil = controlador_perfil_Admin.obtener_perfil_admin(user_id)
    if perfil:
        return render_template('actualizar_perfil_admin.html', perfil=perfil)
    else:
        flash('Perfil no encontrado', 'danger')
        return redirect(url_for('index'))  
