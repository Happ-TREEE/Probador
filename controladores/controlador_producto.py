from bd import obtener_conexion

def obtener_productos():
    conexion = obtener_conexion()
    productos = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.id_producto, pro.nombre, pro.descripcion, pro.precio, pro.notas, 
                cat.nombre AS categoria, tel.nombre AS tela, img.imagen AS imagen 
                FROM PRODUCTO AS pro 
                INNER JOIN CATEGORIA AS cat ON pro.id_categoria = cat.id_categoria 
                INNER JOIN TELA AS tel ON tel.id_producto = pro.id_producto
                INNER JOIN DETALLE_IMAGEN_PRODUCTO AS dip ON dip.id_producto = pro.id_producto
                INNER JOIN IMAGEN_PRODUCTO AS img ON img.id_imagen = dip.id_imagen
                WHERE img.imagen LIKE '%front.webp'""")
        productos = cursor.fetchall()
    conexion.close()
    return productos

    def insertar_producto(nombre, descripcion, precio, notas, id_categoria, imagen_base64):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            INSERT INTO PRODUCTO (nombre, descripcion, precio, notas, id_categoria, vigencia)
            VALUES (%s, %s, %s, %s, %s, 1)
        """, (nombre, descripcion, precio, notas, id_categoria))
        id_producto = cursor.lastrowid

        cursor.execute("INSERT INTO IMAGEN_PRODUCTO (imagen) VALUES (%s)", (imagen_base64,))
        id_imagen = cursor.lastrowid

        cursor.execute("INSERT INTO DETALLE_IMAGEN_PRODUCTO (id_producto, id_imagen) VALUES (%s, %s)", (id_producto, id_imagen))

    conexion.commit()
    conexion.close()


def obtener_producto_por_id(id):
    conexion = obtener_conexion()
    producto = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT pro.id_producto, pro.nombre, pro.descripcion, pro.precio, pro.notas, 
                cat.nombre AS categoria, tel.nombre AS tela, img.imagen AS imagen 
                FROM PRODUCTO AS pro 
                INNER JOIN CATEGORIA AS cat ON pro.id_categoria = cat.id_categoria 
                INNER JOIN TELA AS tel ON tel.id_producto = pro.id_producto
                INNER JOIN DETALLE_IMAGEN_PRODUCTO AS dip ON dip.id_producto = pro.id_producto
                INNER JOIN IMAGEN_PRODUCTO AS img ON img.id_imagen = dip.id_imagen
                WHERE pro.id_producto = %s""", (id))
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
                WHERE pro.id_producto = %s""", (id_producto))
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
                WHERE pro.id_producto = %s""", (id_producto))
        colores = cursor.fetchall()
    conexion.close()
    return colores

def obtener_tallas_por_producto(id_producto):
    conexion = obtener_conexion()
    tallas = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT tal.nombre AS talla_producto FROM TALLA AS tal
                INNER JOIN PRODUCTO_TALLA AS det ON det.id_talla = tal.id_talla
                INNER JOIN PRODUCTO AS pro ON pro.id_producto = det.id_producto
                WHERE pro.id_producto = %s""", (id_producto))
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
                WHERE pro.id_producto = %s""", (id_producto))
        procesos = cursor.fetchall()
    conexion.close()
    return procesos