from flask import render_template, Blueprint
from controladores.controlador_clientes_pagos_pendientes import obtener_clientes_con_pagos_pendientes

router_clientes_pagos_pendientes = Blueprint('router_clientes_pagos_pendientes', __name__)

@router_clientes_pagos_pendientes.route('/reporte_clientes_pagos_pendientes', methods=['GET'])
def reporte_clientes_pagos_pendientes():
    pedidos = obtener_clientes_con_pagos_pendientes()
    return render_template('reporte_pagos_pendientes.html', pedidos=pedidos)
