from bd import obtener_conexion
from datetime import datetime

def formatear_fecha(fecha):
    if fecha is None:
        return ""
    if isinstance(fecha, datetime):
        return fecha.strftime("%Y-%m-%d")
    try:
        dt = datetime.strptime(str(fecha), "%Y-%m-%d %H:%M:%S")
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return str(fecha)

def obtener_pedidos():
    conexion = obtener_conexion()
    pedidos = []
    with conexion.cursor() as cursor:
        cursor.execute("""
            SELECT ped.id_pedido, ped.fecha_registro, ped.fecha_envio, ped.fecha_entrega, ped.id_persona, per.nombre
            FROM PEDIDO AS ped
            INNER JOIN PERSONA AS per ON ped.id_persona = per.id_persona
            ORDER BY ped.id_pedido ASC
        """)
        filas = cursor.fetchall()
        for fila in filas:
            fecha_registro = fila[1]
            if fecha_registro is not None:
                fecha_registro = fecha_registro.strftime('%Y-%m-%d')  # Formatear para input type="date"
            pedidos.append((
                fila[0],
                fecha_registro,
                fila[2],
                fila[3],
                fila[4],
                fila[5]
            ))
    conexion.close()
    return pedidos

def obtener_clientes():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_persona, CONCAT(nombre, ' ', ape_paterno, ' ', ape_materno) AS nombre_completo FROM PERSONA")
        clientes = cursor.fetchall()
    conexion.close()
    return clientes

def insertar_pedido(fecha_registro, fecha_envio, fecha_entrega, id_persona):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            INSERT INTO PEDIDO(fecha_registro, fecha_envio, fecha_entrega, id_persona)
            VALUES (%s, %s, %s, %s)
        """, (fecha_registro, fecha_envio, fecha_entrega, id_persona))
    conexion.commit()
    conexion.close()

def actualizar_pedido(id_pedido, fecha_registro, fecha_envio, fecha_entrega, id_persona):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            UPDATE PEDIDO SET fecha_registro=%s, fecha_envio=%s, fecha_entrega=%s, id_persona=%s
            WHERE id_pedido=%s
        """, (fecha_registro, fecha_envio, fecha_entrega, id_persona, id_pedido))
    conexion.commit()
    conexion.close()

def eliminar_pedido(id_pedido):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM PEDIDO WHERE id_pedido=%s", (id_pedido,))
    conexion.commit()
    conexion.close()
