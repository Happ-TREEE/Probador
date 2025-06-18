import os
from flask import g, Flask, render_template, request, Flask
from routers.router_login import router_login
from routers.router_producto import router_producto
from routers.router_categoria import router_categoria
from routers.routers_talla import router_talla
from routers.router_creador import router_creador
from routers.router_pedido import router_pedido
from routers.router_categoria_producto import router_categoria_producto
from routers.router_proceso_quimico import router_proceso_quimico
from routers.router_pedidos_pagos import router_pedidos_pagos
from routers.router_pedidos_fecha import router_pedidos_fecha
from routers.router_clientes_pagos_pendiente import router_clientes_pagos_pendientes
from routers.router_perfil_admin import router_perfil_admin
from utilidades import autenticacion_requerida, obtener_usuario_logeado
import controladores.controlador_producto as controlador_producto
import controladores.controlador_categoria as controlador_categoria
import controladores.controlador_tallas as controlador_talla


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = os.urandom(24)

app.register_blueprint(router_login)
app.register_blueprint(router_producto)
app.register_blueprint(router_categoria)
app.register_blueprint(router_talla)
app.register_blueprint(router_creador)
app.register_blueprint(router_pedido)
app.register_blueprint(router_categoria_producto)
app.register_blueprint(router_proceso_quimico)
app.register_blueprint(router_pedidos_pagos)
app.register_blueprint(router_pedidos_fecha)
app.register_blueprint(router_clientes_pagos_pendientes)
app.register_blueprint(router_perfil_admin)

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
    tallas = controlador_talla.obtener_tallas_por_nombre_categoria(producto[5])
    return render_template('ver_producto.html', producto = producto, imagenes = imagenes, tallas = tallas)

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

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/inicio_admin')
@autenticacion_requerida(tipo_usuario = 1) 
def inicio_admin():
    return render_template('inicio_admin.html')

@app.route('/prueba_nuevo')
def prueba_nuevo():
    return render_template('prueba_nuevo.html')

@app.route('/cotizador', methods=['GET', 'POST'])
def cotizador():
    if request.method == 'POST':
        # Procesamiento de datos del formulario
        producto = request.form.get('producto', 'Polo Manga Corta')
        color = request.form.get('color', 'Blanco')
        color_hex = request.form.get('color_hex', '#FFFFFF')
        # ... (más parámetros)
        
        # Procesamiento de texto
        texto = request.form.get('texto', '')
        texto_size = request.form.get('texto_size', '24')
        # ... (más parámetros de texto)
        
        # Procesamiento de logos
        logos_html = request.form.get('logos_html', '')
        # ... (más parámetros de logos)
        
        # Rutas de imágenes
        vista_frente = request.form.get('vista_frente', 'ruta/por/defecto/front.webp')
        # ... (más rutas de imágenes)
        
        return render_template('cotizador.html',
                             # ... (pasa todos los parámetros a la plantilla)
                             )
    else:
        # Manejo de solicitudes GET con valores predeterminados
        return render_template('cotizador.html',
                             producto='Polo Manga Corta',
                             color='Blanco',
                             # ... (valores predeterminados)
                             )

if __name__ == '__main__':
    app.run(debug=True)
