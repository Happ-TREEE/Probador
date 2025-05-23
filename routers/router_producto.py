from flask import Blueprint, render_template, request, redirect
from utilidades import autenticacion_requerida
import controladores.controlador_producto as controlador_producto
import controladores.controlador_categoria as controlador_categoria
import controladores.controlador_tela as controlador_tela

router_producto = Blueprint('router_producto', __name__)

@router_producto.route('/gestionar_producto')
@autenticacion_requerida(tipo_usuario=1)
def gestionar_producto():
    productos = controlador_producto.obtener_productos()
    categorias = controlador_categoria.obtener_categorias()
    telas = controlador_tela.obtener_telas()
    return render_template('gestionar_producto.html', productos=productos, categorias=categorias, telas=telas)


@router_producto.route('/gestionar_producto/editar/<int:id_producto>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def editar_producto(id_producto):
    nombre = request.form['nombre']
    descripcion = request.form.get('descripcion', '')
    precio = float(request.form['precio'])
    notas = request.form.get('notas', '')

    id_categoria_str = request.form.get('id_categoria', '').strip()
    id_tela_str = request.form.get('id_tela', '').strip()

    if not id_categoria_str.isdigit() or not id_tela_str.isdigit():
        return "Debe seleccionar categoría y tela", 400

    id_categoria = int(id_categoria_str)
    id_tela = int(id_tela_str)

    imagenes_dict = {
        'frente': request.files.get('imagen_frente'),
        'reverso': request.files.get('imagen_reverso'),
        'izquierda': request.files.get('imagen_izquierda'),
        'derecha': request.files.get('imagen_derecha'),
    }

    controlador_producto.actualizar_producto(
        id_producto, nombre, descripcion, precio, notas, id_categoria, id_tela, imagenes_dict
    )
    return redirect('/gestionar_producto')


@router_producto.route('/gestionar_producto/crear', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def crear_producto():
    nombre = request.form['nombre']
    descripcion = request.form.get('descripcion', '')
    precio = float(request.form['precio'])
    notas = request.form.get('notas', '')
    
    id_categoria_str = request.form.get('id_categoria', '').strip()
    id_tela_str = request.form.get('id_tela', '').strip()

    if not id_categoria_str.isdigit() or not id_tela_str.isdigit():
        # Aquí podrías lanzar un error, o retornar con mensaje
        return "Debe seleccionar categoría y tela", 400

    id_categoria = int(id_categoria_str)
    id_tela = int(id_tela_str)

    imagenes_dict = {
        'frente': request.files.get('imagen_frente'),
        'reverso': request.files.get('imagen_reverso'),
        'izquierda': request.files.get('imagen_izquierda'),
        'derecha': request.files.get('imagen_derecha'),
    }

    controlador_producto.insertar_producto(
        nombre, descripcion, precio, notas, id_categoria, id_tela, imagenes_dict
    )
    return redirect('/gestionar_producto')


@router_producto.route('/gestionar_producto/eliminar/<int:id_producto>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_producto(id_producto):
    controlador_producto.eliminar_producto(id_producto)
    return redirect('/gestionar_producto')

