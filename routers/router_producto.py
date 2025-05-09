from flask import Blueprint, render_template
import controladores.controlador_producto as controlador_producto
from utilidades import autenticacion_requerida

router_producto = Blueprint('router_producto', __name__)

@router_producto.route('/gestionar_producto')
@autenticacion_requerida(tipo_usuario = 1) 
def gestionar_producto():
    productos = controlador_producto.obtener_productos()
    return render_template('mantenimiento.html', productos = productos)