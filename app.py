from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)

@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

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

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/prueba_gestionar')
def prueba_gestionar():
    return render_template('prueba_gestionar.html')

@app.route('/')
def index():
    return render_template('inicio.html')


if __name__ == '__main__':
    app.run(debug=True)
