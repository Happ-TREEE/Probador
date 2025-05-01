from flask import Blueprint, request, redirect, url_for, render_template, flash, session, make_response
import controladores.controlador_producto as controlador_producto
from utilidades import autenticacion_requerida

router_producto = Blueprint('router_producto', __name__)

@router_producto.route('/gestionar_producto')
@autenticacion_requerida(tipo_usuario = 1) 
def gestionar_producto():
    productos = controlador_producto.obtener_productos()
    return render_template('gestionar_producto.html', productos = productos)