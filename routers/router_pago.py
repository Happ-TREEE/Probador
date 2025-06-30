from flask import Blueprint, request, jsonify
from utilidades import autenticacion_requerida
import controladores.controlador_pago as controlador_pago

router_pago = Blueprint("router_pago", __name__)


@router_pago.route("/pago/registrar", methods=["POST"])
<<<<<<< HEAD
@autenticacion_requerida()  # cualquier usuario logueado
=======
>>>>>>> 852b90691b018bd92f80ee9e44c7eeea2d7fc504
def registrar_pago():
    data = request.get_json() or {}

    success = controlador_pago.registrar_pedido_con_pago(
        numero_documento=data.get("numero_documento"),
        tipo_documento=data.get("tipo_documento"),
        tipo_persona=data.get("tipo_persona"),
        nombre_cliente=data.get("nombre_cliente"),
        email=data.get("email"),
        monto=data.get("monto"),
        id_tipo_pago=data.get("id_tipo_pago"),
        medio=data.get("medio"),
        productos=data.get("productos", []),
        codigo_verificacion=data.get("codigo_verificacion"),
    )

    return jsonify({"success": success})
