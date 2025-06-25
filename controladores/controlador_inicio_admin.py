from bd import obtener_conexion
from datetime import datetime

def obtener_total_usuarios():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM USUARIO WHERE id_tipo_usuario != 1")
        total = cursor.fetchone()[0]
    conexion.close()
    return total

def obtener_nuevos_clientes_hoy():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            SELECT COUNT(*) FROM USUARIO
            WHERE id_tipo_usuario = 2 AND DATE(fecha_registro) = CURDATE()
        """)
        total = cursor.fetchone()[0]
    conexion.close()
    return total

def obtener_pedidos_hoy():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM PEDIDO WHERE DATE(fecha_registro) = CURDATE()")
        total = cursor.fetchone()[0]
    conexion.close()
    return total

def obtener_ventas_dia():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT SUM(monto) FROM PAGO WHERE DATE(fecha_registro) = CURDATE()")
        resultado = cursor.fetchone()
        total = resultado[0] if resultado[0] is not None else 0
    conexion.close()
    return total

def obtener_total_por_tipo_persona(id_tipo_persona):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM PERSONA WHERE id_tipo_persona = %s", (id_tipo_persona,))
        total = cursor.fetchone()[0]
    conexion.close()
    return total

def obtener_ventas_anuales():
    anio_actual = datetime.now().year
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            SELECT SUM(monto) FROM PAGO
            WHERE YEAR(fecha_registro) = %s
        """, (anio_actual,))
        resultado = cursor.fetchone()
        total = resultado[0] if resultado[0] is not None else 0
    conexion.close()
    return total

def obtener_resumen_dashboard(id_proveedor, id_distribuidor=4, id_vendedor=5):
    return {
        "total_usuarios": obtener_total_usuarios(),
        "nuevos_clientes_hoy": obtener_nuevos_clientes_hoy(),
        "pedidos_hoy": obtener_pedidos_hoy(),
        "ventas_dia": obtener_ventas_dia(),
        "proveedores": obtener_total_por_tipo_persona(id_proveedor),
        "distribuidores": obtener_total_por_tipo_persona(id_distribuidor),
        "vendedores": obtener_total_por_tipo_persona(id_vendedor),
        "ventas_anuales": obtener_ventas_anuales()
    }
