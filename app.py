import os
from flask import g, Flask, render_template, request, url_for
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

@app.route('/prueba')
def prueba():
    return render_template('prueba.html')

@app.route('/prueba_nuevo')
def prueba_nuevo():
    return render_template('prueba_nuevo.html')

@app.route('/cotizador', methods=['GET', 'POST'])
def cotizador():
    if request.method == 'POST':
        # Obtener datos básicos del producto
        producto = request.form.get('producto', 'Polo Manga Corta')
        color = request.form.get('color', 'Blanco')
        color_hex = request.form.get('color_hex', '#FFFFFF')
        color_opacity = request.form.get('color_opacity', '0.8')
        impresion = request.form.get('impresion', 'Estampado')
        
        # Obtener datos del texto
        texto = request.form.get('texto', '')
        texto_size = request.form.get('texto_size', '24')
        texto_color = request.form.get('texto_color', '#000000')
        texto_bold = request.form.get('texto_bold', 'normal')
        texto_italic = request.form.get('texto_italic', 'normal')
        texto_underline = request.form.get('texto_underline', 'none')
        texto_frente = request.form.get('texto_frente', 'true') == 'true'
        texto_espalda = request.form.get('texto_espalda', 'false') == 'true'
        texto_izquierda = request.form.get('texto_izquierda', 'false') == 'true'
        texto_derecha = request.form.get('texto_derecha', 'false') == 'true'
        
        # Obtener HTML de logos
        logos_html = request.form.get('logos_html', '')
        logos_html_espalda = request.form.get('logos_html_espalda', '')
        logos_html_izquierda = request.form.get('logos_html_izquierda', '')
        logos_html_derecha = request.form.get('logos_html_derecha', '')
        
        # Obtener rutas de imágenes
        vista_frente = request.form.get('vista_frente', '/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_front.webp')
        vista_espalda = request.form.get('vista_espalda', '/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_back.webp')
        vista_izquierda = request.form.get('vista_izquierda', '/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_left.webp')
        vista_derecha = request.form.get('vista_derecha', '/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_right.webp')
        
        # Pasar datos a la plantilla
        return render_template('cotizador.html',
                              producto=producto,
                              color=color,
                              color_hex=color_hex,
                              color_opacity=color_opacity,
                              impresion=impresion,
                              texto=texto,
                              texto_size=texto_size,
                              texto_color=texto_color,
                              texto_bold=texto_bold,
                              texto_italic=texto_italic,
                              texto_underline=texto_underline,
                              texto_frente=texto_frente,
                              texto_espalda=texto_espalda,
                              texto_izquierda=texto_izquierda,
                              texto_derecha=texto_derecha,
                              logos_html=logos_html,
                              logos_html_espalda=logos_html_espalda,
                              logos_html_izquierda=logos_html_izquierda,
                              logos_html_derecha=logos_html_derecha,
                              vista_frente=vista_frente,
                              vista_espalda=vista_espalda,
                              vista_izquierda=vista_izquierda,
                              vista_derecha=vista_derecha)
    else:
        # Para solicitudes GET, mostrar valores predeterminados
        return render_template('cotizador.html',
                              producto='Polo Manga Corta',
                              color='Blanco',
                              color_hex='#FFFFFF',
                              color_opacity='0.8',
                              impresion='Estampado',
                              texto='',
                              texto_size='24',
                              texto_color='#000000',
                              texto_bold='normal',
                              texto_italic='normal',
                              texto_underline='none',
                              texto_frente=True,
                              texto_espalda=False,
                              texto_izquierda=False,
                              texto_derecha=False,
                              logos_html='',
                              logos_html_espalda='',
                              logos_html_izquierda='',
                              logos_html_derecha='',
                              vista_frente='/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_front.webp',
                              vista_espalda='/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_back.webp',
                              vista_izquierda='/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_left.webp',
                              vista_derecha='/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_right.webp')

@app.route('/inicio_admin')
@autenticacion_requerida(tipo_usuario = 1) 
def inicio_admin():
    return render_template('inicio_admin.html')

if __name__ == '__main__':
    app.run(debug=True)
