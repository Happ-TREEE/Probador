from flask import Blueprint, render_template, request
from controladores.controlador_reporte_pedidos_pagos import obtener_reporte_pedidos_pagos

router_pedidos_pagos = Blueprint('router_pedidos_pagos', __name__)

@router_pedidos_pagos.route('/reporte_pedidos_pagos', methods=['GET'])
def reporte_pedidos_pagos():
    id_pedido = request.args.get('id_pedido', default=None, type=int)
    pedidos = obtener_reporte_pedidos_pagos(id_pedido)
    
    return render_template('Pedidos_Pagos.html', pedidos=pedidos)

