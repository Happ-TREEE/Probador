from flask import Blueprint, request, redirect, url_for, render_template, flash, session
from controladores.controlador_usuario import verificar_usuario, registrar_usuario

router_login = Blueprint('router_login', __name__)

@router_login.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        usuario = verificar_usuario(correo, contraseña)
        if usuario:
            session['usuario_id'] = usuario['id_usuario']
            session['tipo_usuario'] = usuario['tipo_usuario']
            flash('Inicio de sesión exitoso.', 'success')
            return redirect(url_for('inicio'))  # Cambia 'home' por la vista principal de tu app
        else:
            flash('Correo o contraseña incorrectos.', 'danger')
    return render_template('login.html')


@router_login.route('/registro', methods=['POST'])
def registro():
    nombre = request.form['nombre']
    apellido = request.form.get('apellido', '')  # Opcional
    correo = request.form['correo']
    telefono = request.form['telefono']
    contraseña = request.form['contraseña']

    if registrar_usuario(nombre, apellido, correo, telefono, contraseña):
        flash('Registro exitoso. Ahora puedes iniciar sesión.', 'success')
    else:
        flash('Error al registrar. Puede que el correo ya esté en uso.', 'danger')

    return redirect(url_for('router_login.login'))
