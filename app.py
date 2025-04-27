from flask import Flask, render_template, request, redirect, url_for, session, flash
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
from functools import wraps

# from routers.router_login import router_login

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta'

# Comentar conexión SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/script_base_datos_textil'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)

# COMENTAMOS EL MODELO SQLALCHEMY
# class Usuario(db.Model):
#     __tablename__ = 'Usuario'
#     id_usuario = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String(100), nullable=False)
#     apellido = db.Column(db.String(100), nullable=True)
#     correo = db.Column(db.String(100), unique=True, nullable=False)
#     contraseña = db.Column(db.String(255), nullable=False)

# Redirección de raíz
    # def inicio():
#     if 'usuario_id' not in session:
#         return redirect(url_for('router_login.login'))
#     return render_template('index.html', mostrar_bienvenida=True, autenticado=True)

@app.route('/')
@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

# Otras rutas (activas)
@app.route('/catalogo')
def catalogo():
    return render_template('catalogo.html')

@app.route('/creador')
def creador():
    return render_template('creador.html')

@app.route('/sobre_nosotros')
def sobre_nosotros():
    return render_template('sobre_nosotros.html')

@app.route('/contactanos')
def contactanos():
    return render_template('contactanos.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/gestionar_prueba')
def prueba_gestionar():
    return render_template('gestionar_prueba.html')

# Cierre de sesión
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('router_login.login'))

# Registro del blueprint
# app.register_blueprint(router_login)

if __name__ == '__main__':
    app.run(debug=True)

""" from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from functools import wraps
import pymysql

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta'  # Necesario para sesiones

# Configura tu base de datos (SQLAlchemy)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/script_base_datos_textil'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configura Bcrypt para encriptar contraseñas
bcrypt = Bcrypt(app)

# Modelo de Usuario
class Usuario(db.Model):
    __tablename__ = 'Usuario'  # Asegúrate de que este nombre sea el correcto en tu base de datos
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=True)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)

# Ruta raíz redirige a /login si no está autenticado
@app.route('/')
def index():
    autenticado = 'usuario_id' in session
    return render_template('index.html', autenticado=autenticado)

def login_requerido(f):
    @wraps(f)
    def decorada(*args, **kwargs):
        if 'usuario_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorada


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contraseña = request.form['contraseña']

        usuario = Usuario.query.filter_by(correo=correo).first()

        if usuario and bcrypt.check_password_hash(usuario.contraseña, contraseña):
            session['usuario_id'] = usuario.id_usuario
            session['nombre'] = usuario.nombre
            flash('¡Bienvenido de nuevo!', 'success')
            return redirect(url_for('index'))      # ← redirigir, no renderizar

        else:
            flash('Correo o contraseña incorrectos.', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html')



@app.route('/inicio')
@login_requerido
def inicio():
    return render_template('inicio.html',
                           mostrar_bienvenida=True,
                           autenticado=True)

@app.route('/catalogo')
def catalogo():
    return render_template('catalogo.html')

@app.route('/creador')
def creador():
    return render_template('creador.html')

@app.route('/sobre_nosotros')
def sobre_nosotros():
    return render_template('sobre_nosotros.html')

@app.route('/contactanos')
def contactanos():
    return render_template('contactanos.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/prueba_gestionar')
def prueba_gestionar():
    return render_template('prueba_gestionar.html')

# Registro
@app.route('/registro', methods=['POST'])
def registro():
    nombre = request.form['nombre']
    apellido = request.form.get('apellido', '')  # Opcional
    correo = request.form['correo']
    contraseña = bcrypt.generate_password_hash(request.form['contraseña']).decode('utf-8')

    if Usuario.query.filter_by(correo=correo).first():
        flash('El correo ya está registrado.')
        return redirect(url_for('login'))  # Redirige al login si el correo ya está registrado

    nuevo_usuario = Usuario(nombre=nombre, apellido=apellido, correo=correo, contraseña=contraseña)
    db.session.add(nuevo_usuario)
    db.session.commit()
    flash('Registro exitoso, ahora puedes iniciar sesión.')
    return redirect(url_for('login'))  # Redirige al login después del registro

@app.route('/logout')
def logout():
    session.clear()                    # 1. vacía la sesión
    return redirect(url_for('index'))  # 2. vuelve a “/” (index público)


if __name__ == '__main__':
    app.run(debug=True) """

