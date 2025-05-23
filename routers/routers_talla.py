from flask import (
    Blueprint,
    abort,
    jsonify,
    redirect,
    request,
    render_template
)
import controladores.controlador_tallas as controlador_talla
from utilidades import autenticacion_requerida
from flask import Blueprint, render_template

router_talla = Blueprint("router_talla", __name__)



@router_talla.route('/Gestionar_Tallas')
def gestionar_talla():
    tallas = controlador_talla.obtener_tallas()
    return render_template('Gestionar_Tallas.html', tallas=tallas)

@router_talla.route("/editar_talla/<int:id>")
@autenticacion_requerida(tipo_usuario=1)
def editar_talla(id):
    talla = controlador_talla.obtener_talla_por_id(id)
    return render_template("editar_talla.html", talla=talla)


@router_talla.route("/accion_talla", methods=["POST"])
@autenticacion_requerida(tipo_usuario=1)
def accion_talla():
    accion = request.form.get("accion")
    nombre = request.form.get("nombre")
    id_talla = request.form.get("id")

    # Validación básica
    if accion not in ["Registrar", "Modificar"]:
        return abort(400, description="Acción inválida")

    if accion == "Registrar":
        resultado = controlador_talla.registrar_talla(nombre.strip())
        if resultado:
            return redirect("/Gestionar_Tallas")
        else:
            return "Error al registrar la talla", 500

    elif accion == "Modificar":
        if not id_talla or not id_talla.isdigit():
            return "ID de talla inválido", 400
        resultado = controlador_talla.modificar_talla(id_talla, nombre.strip())
        if resultado:
            return redirect("/Gestionar_Tallas")
        else:
            return "Error al modificar la talla", 500



@router_talla.route("/eliminar_talla", methods=["POST"])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_talla():
    try:
        id = request.form["id"]
        controlador_talla.eliminar_talla(id)
        # return jsonify({"status": "ok", "mensaje": "Talla eliminada con éxito"})
        return redirect("/Gestionar_Tallas")
    except:
        # return jsonify({"status": "error", "mensaje": "Error al eliminar la talla"}), 500
        return "Error al eliminar la talla", 500

