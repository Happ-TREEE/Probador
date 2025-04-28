from bd import obtener_conexion

def obtener_productos():
    conexion = obtener_conexion()
    productos = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.id_producto, pro.nombre, pro.descripcion, pro.precio, pro.imagen, pro.notas, cat.nombre AS categoria
                FROM PRODUCTO AS pro INNER JOIN CATEGORIA AS cat
                ON pro.id_categoria = cat.id_categoria""")
        productos = cursor.fetchall()
    conexion.close()
    return productos