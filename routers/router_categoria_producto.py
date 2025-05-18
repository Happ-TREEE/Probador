from flask import Blueprint, render_template, request, redirect
import controladores.controlador_categoria_producto as controlador_categoria_producto
from utilidades import autenticacion_requerida

router_categoria_producto = Blueprint('router_categoria_producto', __name__)

@router_categoria_producto.route('/gestionar_categoria_producto')
@autenticacion_requerida(tipo_usuario=1)
def gestionar_categoria_producto():
    categorias = controlador_categoria_producto.obtener_categorias()
    return render_template('gestionar_categoria_producto.html', categorias=categorias)

@router_categoria_producto.route('/gestionar_categoria_producto/crear', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def crear_categoria_producto():
    nombre = request.form['nombre']
    vigencia = True if request.form.get('vigencia') == 'on' else False
    controlador_categoria_producto.insertar_categoria(nombre, vigencia)
    return redirect('/gestionar_categoria_producto')

@router_categoria_producto.route('/gestionar_categoria_producto/editar/<int:id_categoria>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def editar_categoria_producto(id_categoria):
    nombre = request.form['nombre']
    vigencia = True if request.form.get('vigencia') == 'on' else False
    controlador_categoria_producto.actualizar_categoria(id_categoria, nombre, vigencia)
    return redirect('/gestionar_categoria_producto')

@router_categoria_producto.route('/gestionar_categoria_producto/eliminar/<int:id_categoria>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_categoria_producto(id_categoria):
    controlador_categoria_producto.eliminar_categoria(id_categoria)
    return redirect('/gestionar_categoria_producto')
