from bd import obtener_conexion


def obtener_productos():
    conexion = obtener_conexion()
    productos = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.id_producto, pro.nombre, pro.descripcion, pro.precio, pro.notas, 
                cat.nombre AS categoria, COALESCE(tel.nombre,' ') AS tela, img.imagen AS imagen 
                FROM PRODUCTO AS pro 
                INNER JOIN CATEGORIA AS cat ON pro.id_categoria = cat.id_categoria 
                LEFT JOIN TELA AS tel ON tel.id_producto = pro.id_producto
                INNER JOIN DETALLE_IMAGEN_PRODUCTO AS dip ON dip.id_producto = pro.id_producto
                INNER JOIN IMAGEN_PRODUCTO AS img ON img.id_imagen = dip.id_imagen
                WHERE img.imagen LIKE '%frente.webp'"""
        )
        productos = cursor.fetchall()
    conexion.close()
    return productos


def obtener_producto_por_id(id):
    conexion = obtener_conexion()
    producto = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.id_producto, pro.nombre, pro.descripcion, pro.precio, pro.notas, 
                cat.nombre AS categoria, tel.nombre AS tela, img.imagen AS imagen 
                FROM PRODUCTO AS pro 
                INNER JOIN CATEGORIA AS cat ON pro.id_categoria = cat.id_categoria 
                LEFT JOIN TELA AS tel ON tel.id_producto = pro.id_producto
                INNER JOIN DETALLE_IMAGEN_PRODUCTO AS dip ON dip.id_producto = pro.id_producto
                INNER JOIN IMAGEN_PRODUCTO AS img ON img.id_imagen = dip.id_imagen
                WHERE pro.id_producto = %s""",
            (id,),
        )
        producto = cursor.fetchone()
    conexion.close()
    return producto


def obtener_imagenes_por_producto(id_producto):
    conexion = obtener_conexion()
    imagenes = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT img.imagen AS imagen_producto FROM IMAGEN_PRODUCTO AS img 
                INNER JOIN DETALLE_IMAGEN_PRODUCTO AS det ON det.id_imagen = img.id_imagen
                INNER JOIN PRODUCTO AS pro ON pro.id_producto = det.id_producto
                WHERE pro.id_producto = %s ORDER BY 
                CASE
                    WHEN imagen_producto LIKE '%%frente.webp' THEN 1
                    WHEN imagen_producto LIKE '%%izquierda.webp' THEN 2
                    WHEN imagen_producto LIKE '%%derecha.webp' THEN 3
                    WHEN imagen_producto LIKE '%%atras.webp' THEN 4
                END;
                """,
            (id_producto,),
        )
        imagenes = cursor.fetchall()
    conexion.close()
    return imagenes


def obtener_colores_por_producto(id_producto):
    conexion = obtener_conexion()
    colores = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT col.nombre AS color_producto FROM COLOR AS col 
                INNER JOIN PRODUCTO_COLOR AS det ON det.id_color = col.id_color
                INNER JOIN PRODUCTO AS pro ON pro.id_producto = det.id_producto
                WHERE pro.id_producto = %s""",
            (id_producto,),
        )
        colores = cursor.fetchall()
    conexion.close()
    return colores


def obtener_tallas_por_producto(id_producto):
    conexion = obtener_conexion()
    tallas = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT tal.nombre AS talla_producto FROM TALLA AS tal
                INNER JOIN CATEGORIA_TALLA AS cata ON cata.id_talla = tal.id_talla
                INNER JOIN CATEGORIA AS cat ON cat.id_categoria = cata.id_categoria
                INNER JOIN PRODUCTO AS pro ON pro.id_categoria = cat.id_categoria
                WHERE pro.id_producto = %s""",
            (id_producto,),
        )
        tallas = cursor.fetchall()
    conexion.close()
    return tallas


def obtener_procesos_quimicos(id_producto):
    conexion = obtener_conexion()
    procesos = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.nombre AS proceso_quimico FROM PROCESO_QUIMICO AS qui
                INNER JOIN PROCESO_QUIMICO_TELA AS det ON det.id_proceso_quimico = qui.id_proceso_quimico
                INNER JOIN TELA AS tel ON tel.id_tela = det.id_tela
                INNER JOIN PRODUCTO AS pro ON pro.id_producto = tel.id_producto
                WHERE pro.id_producto = %s""",
            (id_producto,),
        )
        procesos = cursor.fetchall()
    conexion.close()
    return procesos
