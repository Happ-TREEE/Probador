from flask import Blueprint, render_template, request, redirect
from utilidades import autenticacion_requerida
import controladores.controlador_producto as controlador_producto
import controladores.controlador_categoria as controlador_categoria

router_producto = Blueprint('router_producto', __name__)

@router_producto.route('/gestionar_producto')
@autenticacion_requerida(tipo_usuario=1)
def gestionar_producto():
    productos = controlador_producto.obtener_productos()
    categorias = controlador_categoria.obtener_categorias()
    return render_template('gestionar_producto.html', productos=productos, categorias=categorias)

@router_producto.route('/gestionar_producto/editar/<int:id_producto>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def editar_producto(id_producto):
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    notas = request.form['notas']
    id_categoria = request.form['id_categoria']
    imagen_file = request.files.get('imagen')

    controlador_producto.actualizar_producto(id_producto, nombre, descripcion, precio, notas, id_categoria, imagen_file)
    return redirect('/gestionar_producto')

@router_producto.route('/gestionar_producto/crear', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def crear_producto():
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    notas = request.form['notas']
    id_categoria = request.form['id_categoria']
    imagen_file = request.files['imagen']

    controlador_producto.insertar_producto(nombre, descripcion, precio, notas, id_categoria, imagen_file)
    return redirect('/gestionar_producto')

@router_producto.route('/gestionar_producto/eliminar/<int:id_producto>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_producto(id_producto):
    controlador_producto.eliminar_producto(id_producto)
    return redirect('/gestionar_producto')

