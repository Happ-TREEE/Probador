from bd import obtener_conexion

def obtener_reporte_pedidos_pagos(id_pedido=None):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            query = """
                SELECT
                    p.id_pedido,
                    p.fecha_registro,
                    CONCAT(per.nombre, ' ', per.ape_paterno, ' ', per.ape_materno) AS nombre_completo,
                    per.numero_telefono AS telefono,
                    COALESCE(SUM(pg.monto), 0) AS monto_pagado,
                    CASE
                        WHEN COALESCE(SUM(pg.monto), 0) = 0 THEN 'Pendiente'
                        WHEN COALESCE(SUM(pg.monto), 0) < 1000 THEN 'Parcial'
                        WHEN COALESCE(SUM(pg.monto), 0) >= 1000 THEN 'Completo'
                    END AS estado_pago
                FROM PEDIDO p
                LEFT JOIN PAGO pg ON p.id_pedido = pg.id_pedido
                INNER JOIN PERSONA per ON p.id_persona = per.id_persona
            """
            
            # Agregar filtro de búsqueda si se pasa el id_pedido
            if id_pedido:
                query += f" WHERE p.id_pedido = {id_pedido}"

            query += """
                GROUP BY p.id_pedido, p.fecha_registro, nombre_completo, telefono
                ORDER BY p.fecha_registro DESC
            """

            cursor.execute(query)
            columnas = [col[0] for col in cursor.description]
            resultados = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        return resultados
    finally:
        conexion.close()
