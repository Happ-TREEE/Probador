from flask import Blueprint, render_template, request, redirect
import controladores.controlador_proceso_quimico as controlador_proceso_quimico
from utilidades import autenticacion_requerida

router_proceso_quimico = Blueprint('router_proceso_quimico', __name__)

@router_proceso_quimico.route('/gestionar_proceso_quimico')
@autenticacion_requerida(tipo_usuario=1)
def gestionar_proceso_quimico():
    procesos = controlador_proceso_quimico.obtener_procesos_quimicos()
    return render_template('gestionar_proceso_quimico.html', procesos=procesos)

@router_proceso_quimico.route('/gestionar_proceso_quimico/crear', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def crear_proceso_quimico():
    nombre = request.form['nombre']
    controlador_proceso_quimico.insertar_proceso_quimico(nombre)
    return redirect('/gestionar_proceso_quimico')

@router_proceso_quimico.route('/gestionar_proceso_quimico/editar/<int:id_proceso_quimico>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def editar_proceso_quimico(id_proceso_quimico):
    nombre = request.form['nombre']
    controlador_proceso_quimico.actualizar_proceso_quimico(id_proceso_quimico, nombre)
    return redirect('/gestionar_proceso_quimico')

@router_proceso_quimico.route('/gestionar_proceso_quimico/eliminar/<int:id_proceso_quimico>', methods=['POST'])
@autenticacion_requerida(tipo_usuario=1)
def eliminar_proceso_quimico(id_proceso_quimico):
    controlador_proceso_quimico.eliminar_proceso_quimico(id_proceso_quimico)
    return redirect('/gestionar_proceso_quimico')
