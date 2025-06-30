from flask import Blueprint, request, jsonify
from utilidades import autenticacion_requerida
import controladores.controlador_pago as controlador_pago

router_pago = Blueprint("router_pago", __name__)

@router_pago.route("/pago/registrar", methods=["POST"])
@autenticacion_requerida()  # cualquier usuario logueado
def registrar_pago():
    data = request.get_json() or {}
    success = controlador_pago.registrar_pedido_con_pago(
        id_persona=data.get("id_persona"),
        monto=data.get("monto"),
        id_tipo_pago=data.get("id_tipo_pago"),
        medio=data.get("medio"),
        productos=data.get("productos", []),
        codigo_verificacion=data.get("codigo_verificacion"),
    )
    return jsonify({"success": success})
