from flask import Blueprint, render_template
from utilidades import autenticacion_requerida
import controladores.controlador_inicio_admin as controlador_inicio

router_inicio_admin = Blueprint('router_inicio_admin', __name__)

@router_inicio_admin.route('/inicio_admin')
@autenticacion_requerida(tipo_usuario=1)
def inicio_admin():
    resumen = controlador_inicio.obtener_resumen_dashboard(
        id_proveedor=3,
        id_distribuidor=4,
        id_vendedor=5
    )
    return render_template('inicio_admin.html', resumen=resumen)

