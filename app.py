import os
from flask import g, Flask, render_template, request
from routers.router_login import router_login
from routers.router_producto import router_producto
from routers.router_categoria import router_categoria
from routers.router_creador import router_creador
from utilidades import autenticacion_requerida, obtener_usuario_logeado
import controladores.controlador_producto as controlador_producto
import controladores.controlador_categoria as controlador_categoria

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = os.urandom(24)

app.register_blueprint(router_login)
app.register_blueprint(router_producto)
app.register_blueprint(router_categoria)
app.register_blueprint(router_creador)

@app.before_request
def before_request():
    obtener_usuario_logeado()

@app.route('/')
@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

@app.route('/catalogo')
def catalogo():
    search_query = request.args.get('search', '')
    categorias = controlador_categoria.obtener_categorias()
    productos = controlador_producto.obtener_productos()
    return render_template('catalogo.html', categorias = categorias , productos = productos, search_query = search_query)

@app.route('/ver_producto/<int:id>')
def ver_producto(id):
    producto = controlador_producto.obtener_producto_por_id(id)
    imagenes = controlador_producto.obtener_imagenes_por_producto(id)
    colores = controlador_producto.obtener_colores_por_producto(id)
    tallas = controlador_producto.obtener_tallas_por_producto(id)
    procesos = controlador_producto.obtener_procesos_quimicos(id)
    return render_template('ver_producto.html', producto = producto, imagenes = imagenes, colores = colores, tallas = tallas, procesos = procesos)

@app.route('/creador')
def creador():
    return render_template('creador.html')

@app.route('/sobre_nosotros')
def sobre_nosotros():
    return render_template('sobre_nosotros.html')

@app.route('/contactanos')
def contactanos():
    return render_template('contactanos.html')

@app.route('/pago')
def pago():
    return render_template('pago.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/inicio_admin')
@autenticacion_requerida(tipo_usuario = 1) 
def inicio_admin():
    return render_template('inicio_admin.html')

if __name__ == '__main__':
    app.run(debug=True)
