from flask import (
    Blueprint,
    abort,
    jsonify,
    request,
    render_template
)
import controladores.controlador_categoria as controlador_categoria
from utilidades import autenticacion_requerida

router_categoria = Blueprint("router_categoria", __name__)


@router_categoria.route("/gestionar_categoria")
@autenticacion_requerida(tipo_usuario=1)
def gestionar_categoria():
    categorias = controlador_categoria.obtener_categorias()
    return render_template("mantenimiento.html", categorias=categorias)

@router_categoria.route("/accion_categoria", methods=["POST"])
@autenticacion_requerida(tipo_usuario=1)
def accion_categoria():
    accion = request.form.get("accion")
    nombre = request.form.get("nombre")
    id_categoria = request.form.get("id")
    vigencia = request.form.get("vigencia") == "vigente"

    errores = {}

    # Validación de la acción
    if accion not in ["Registrar", "Modificar"]:
        return jsonify({"status": "error", "mensaje": "Acción inválida."}), 400

    # Validación del ID para la modificación
    if accion == "Modificar":
        if not id_categoria or not id_categoria.isdigit():
            errores["id"] = "El ID de categoría no es válido."

    if errores:
        return jsonify({"status": "error", "errores": errores, "mensaje": "Error de validación."}), 400

    if accion == "Registrar":
        categoria = controlador_categoria.registrar_categoria(nombre.strip())
        if categoria:
            return jsonify({"status": "ok", "mensaje": "Categoría registrada con éxito"})
        
        else:
            return jsonify({"status": "error", "mensaje": "Error al registrar la categoría"}), 500
        
    elif accion == "Modificar":
        if controlador_categoria.modificar_categoria(id_categoria, nombre.strip(), vigencia):
            return jsonify({"status": "ok", "mensaje": "Categoría modificada con éxito"})
        
        else:
            return jsonify({"status": "error", "mensaje": "Error al modificar la categoría"}), 500
        
    else:
        return abort(400, description="Acción inválida")


# @router_categoria.route("/registrar_categoria", methods=["POST"])
# @autenticacion_requerida(tipo_usuario=1)
# def registrar_categoria():
#     nombre = request.form["nombre"]
#     controlador_categoria.registrar_categoria(nombre)


# @router_categoria.route("/modificar_categoria", methods=["POST"])
# @autenticacion_requerida(tipo_usuario=1)
# def modificar_categoria():
#     id = request.form["id"]
#     nombre = request.form["nombre"]
#     if request.form["vigencia"] == "vigente":
#         vigencia = True
#     else:
#         vigencia = False
#     controlador_categoria.modificar_categoria(id, nombre, vigencia)

@router_categoria.route("/eliminar_categoria", methods=["POST"])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_categoria():
    try:
        id = request.form["id"]
        controlador_categoria.eliminar_categoria(id)
        return jsonify({"status": "ok", "mensaje": "Categoría eliminada con éxito"})
    
    except:
        return jsonify({"status": "error", "mensaje": "Error al eliminar la categoría"}), 500
    
