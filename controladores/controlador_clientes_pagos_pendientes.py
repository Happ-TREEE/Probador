from bd import obtener_conexion

def obtener_clientes_con_pagos_pendientes():
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            query = """
               SELECT 
                    p.id_pedido,
                    p.fecha_registro,
                    CONCAT(per.nombre, ' ', per.ape_paterno, ' ', per.ape_materno) AS nombre_completo,
                    per.numero_telefono AS telefono,
                    CASE 
                        WHEN COALESCE(SUM(pg.monto), 0) >= COALESCE(SUM(dp.precio), 0) THEN 'Pagado'
                        ELSE CONCAT('S/ ', COALESCE(SUM(dp.precio), 0) - COALESCE(SUM(pg.monto), 0))
                    END AS monto_pagado
                FROM PEDIDO p
                LEFT JOIN PAGO pg ON p.id_pedido = pg.id_pedido
                INNER JOIN PERSONA per ON p.id_persona = per.id_persona
                LEFT JOIN PRODUCTO dp ON p.id_pedido = dp.id_producto
                GROUP BY p.id_pedido
                ORDER BY p.fecha_registro DESC;

            """
            cursor.execute(query)
            columnas = [col[0] for col in cursor.description]
            resultados = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        return resultados
    finally:
        conexion.close()

