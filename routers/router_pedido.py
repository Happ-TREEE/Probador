from flask import Blueprint, render_template, request, redirect
import controladores.controlador_pedido as controlador_pedido
from utilidades import autenticacion_requerida

router_pedido = Blueprint('router_pedido', __name__)

@router_pedido.route('/gestionar_pedido')
def gestionar_pedido():
    pedidos = controlador_pedido.obtener_pedidos()
    clientes = controlador_pedido.obtener_clientes()
    return render_template('gestionar_pedido.html', pedidos=pedidos, clientes=clientes)

@router_pedido.route('/gestionar_pedido/crear', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def crear_pedido():
    fecha_registro = request.form['fecha_registro']
    fecha_envio = request.form['fecha_envio']
    fecha_entrega = request.form['fecha_entrega']
    id_persona = request.form['id_persona']

    controlador_pedido.insertar_pedido(fecha_registro, fecha_envio, fecha_entrega, id_persona)
    return redirect('/gestionar_pedido')

@router_pedido.route('/gestionar_pedido/editar/<int:id_pedido>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def editar_pedido(id_pedido):
    fecha_registro = request.form['fecha_registro']
    fecha_envio = request.form['fecha_envio']
    fecha_entrega = request.form['fecha_entrega']
    id_persona = request.form['id_persona']

    controlador_pedido.actualizar_pedido(id_pedido, fecha_registro, fecha_envio, fecha_entrega, id_persona)
    return redirect('/gestionar_pedido')

@router_pedido.route('/gestionar_pedido/eliminar/<int:id_pedido>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_pedido(id_pedido):
    controlador_pedido.eliminar_pedido(id_pedido)
    return redirect('/gestionar_pedido')
