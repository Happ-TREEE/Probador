from flask import request, render_template, Blueprint

from controladores.controlador_pedido_fechas import obtener_reporte_pedidos_pagos_rango

router_pedidos_fecha = Blueprint('router_pedidos_fecha', __name__)

@router_pedidos_fecha.route('/reporte_pedidos_fecha', methods=['GET', 'POST'])
def reporte_pedidos_fecha():
    pedidos = []
    if request.method == 'POST':
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        pedidos = obtener_reporte_pedidos_pagos_rango(fecha_inicio, fecha_fin)
    return render_template('pedidos_pagos_rango.html', pedidos=pedidos)
