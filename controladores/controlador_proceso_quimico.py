from bd import obtener_conexion

def obtener_procesos_quimicos():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT id_proceso_quimico, nombre FROM PROCESO_QUIMICO ORDER BY id_proceso_quimico ASC")
    procesos = cursor.fetchall()
    cursor.close()
    conexion.close()
    return procesos

def insertar_proceso_quimico(nombre):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO PROCESO_QUIMICO (nombre) VALUES (%s)", (nombre,))
    conexion.commit()
    cursor.close()
    conexion.close()

def actualizar_proceso_quimico(id_proceso_quimico, nombre):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("UPDATE PROCESO_QUIMICO SET nombre = %s WHERE id_proceso_quimico = %s", (nombre, id_proceso_quimico))
    conexion.commit()
    cursor.close()
    conexion.close()

def eliminar_proceso_quimico(id_proceso_quimico):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM PROCESO_QUIMICO WHERE id_proceso_quimico = %s", (id_proceso_quimico,))
    conexion.commit()
    cursor.close()
    conexion.close()
