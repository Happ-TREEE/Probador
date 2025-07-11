from bd import obtener_conexion
from utilidades import guardar_imagen_webp
from PIL import Image
import os
import uuid
from flask import current_app

def obtener_productos():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            SELECT
                pro.id_producto,
                pro.nombre,
                pro.descripcion,
                pro.precio,
                pro.notas,
                cat.nombre AS categoria,
                tel.nombre AS tela,
                (SELECT img.imagen FROM IMAGEN_PRODUCTO img
                 JOIN DETALLE_IMAGEN_PRODUCTO dip ON dip.id_imagen = img.id_imagen
                 WHERE dip.id_producto = pro.id_producto AND img.imagen LIKE '%_frente.webp'
                 LIMIT 1) AS imagen_frente,
                (SELECT img.imagen FROM IMAGEN_PRODUCTO img
                 JOIN DETALLE_IMAGEN_PRODUCTO dip ON dip.id_imagen = img.id_imagen
                 WHERE dip.id_producto = pro.id_producto AND 
                   (img.imagen LIKE '%_reverso.webp' OR img.imagen LIKE '%_atras.webp')
                 LIMIT 1) AS imagen_reverso,
                (SELECT img.imagen FROM IMAGEN_PRODUCTO img
                 JOIN DETALLE_IMAGEN_PRODUCTO dip ON dip.id_imagen = img.id_imagen
                 WHERE dip.id_producto = pro.id_producto AND img.imagen LIKE '%_izquierda.webp'
                 LIMIT 1) AS imagen_izquierda,
                (SELECT img.imagen FROM IMAGEN_PRODUCTO img
                 JOIN DETALLE_IMAGEN_PRODUCTO dip ON dip.id_imagen = img.id_imagen
                 WHERE dip.id_producto = pro.id_producto AND img.imagen LIKE '%_derecha.webp'
                 LIMIT 1) AS imagen_derecha
            FROM PRODUCTO pro
            JOIN CATEGORIA cat ON pro.id_categoria = cat.id_categoria
            JOIN TELA tel ON pro.id_tela = tel.id_tela
            ORDER BY pro.id_producto ASC;
        """)
        productos = cursor.fetchall()
    conexion.close()
    return productos

def obtener_telas():
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_tela, nombre FROM TELA ORDER BY nombre ASC")
        telas = cursor.fetchall()
    conexion.close()
    return telas

def insertar_producto(nombre, descripcion, precio, notas, id_categoria, id_tela, imagenes_dict):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO PRODUCTO (nombre, descripcion, precio, notas, id_categoria, id_tela, vigencia)
            VALUES (%s, %s, %s, %s, %s, %s, 1)
            """,
            (nombre, descripcion, precio, notas, id_categoria, id_tela),
        )
        id_producto = cursor.lastrowid

        # Guardar imágenes con sufijos
        for lado, archivo in imagenes_dict.items():
            if archivo and archivo.filename != "":
                nombre_archivo = guardar_imagenes_webp({lado: archivo})[lado]
                cursor.execute("INSERT INTO IMAGEN_PRODUCTO (imagen) VALUES (%s)", (nombre_archivo,))
                id_imagen = cursor.lastrowid
                cursor.execute("INSERT INTO DETALLE_IMAGEN_PRODUCTO (id_producto, id_imagen) VALUES (%s, %s)", (id_producto, id_imagen))

    conexion.commit()
    conexion.close()

def guardar_imagenes_webp(imagen_files):
    nombres_guardados = {}
    for lado, archivo in imagen_files.items():
        if archivo and archivo.filename != "":
            imagen = Image.open(archivo).convert("RGBA")
            sufijo = lado
            # Siempre usa 'reverso' en lugar de 'atras'
            if lado == "atras":
                sufijo = "reverso"
            nombre_archivo = f"{uuid.uuid4().hex}_{sufijo}.webp"
            ruta_guardado = os.path.join(
                current_app.root_path, "static", "img", "catalogo", nombre_archivo
            )
            imagen.save(ruta_guardado, "WEBP", quality=80)
            nombres_guardados[lado] = nombre_archivo
    return nombres_guardados

def actualizar_producto(id_producto, nombre, descripcion, precio, notas, id_categoria, id_tela, imagenes_dict):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            """
            UPDATE PRODUCTO SET nombre=%s, descripcion=%s, precio=%s, notas=%s, id_categoria=%s, id_tela=%s
            WHERE id_producto=%s
            """,
            (nombre, descripcion, precio, notas, id_categoria, id_tela, id_producto),
        )
        
        nombres_guardados = guardar_imagenes_webp(imagenes_dict)
        
        for lado, nombre_archivo in nombres_guardados.items():
            cursor.execute(
                """
                SELECT ip.id_imagen FROM IMAGEN_PRODUCTO ip
                JOIN DETALLE_IMAGEN_PRODUCTO dip ON ip.id_imagen = dip.id_imagen
                WHERE dip.id_producto = %s AND ip.imagen LIKE %s
                """,
                (id_producto, f"%_{lado}.webp"),
            )
            id_imagen = cursor.fetchone()

            if id_imagen:
                cursor.execute(
                    "UPDATE IMAGEN_PRODUCTO SET imagen = %s WHERE id_imagen = %s",
                    (nombre_archivo, id_imagen[0]),
                )
            else:
                cursor.execute(
                    "INSERT INTO IMAGEN_PRODUCTO (imagen) VALUES (%s)",
                    (nombre_archivo,),
                )
                nuevo_id_imagen = cursor.lastrowid
                cursor.execute(
                    "INSERT INTO DETALLE_IMAGEN_PRODUCTO (id_producto, id_imagen) VALUES (%s, %s)",
                    (id_producto, nuevo_id_imagen),
                )

    conexion.commit()
    conexion.close()



def obtener_producto_por_id(id):
    conexion = obtener_conexion()
    producto = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """
            SELECT pro.id_producto, pro.nombre, COALESCE(pro.descripcion, ''), pro.precio, pro.notas,
                   cat.nombre AS categoria, tel.nombre AS tela, img.imagen AS imagen
            FROM PRODUCTO AS pro
            INNER JOIN CATEGORIA AS cat ON pro.id_categoria = cat.id_categoria
            INNER JOIN TELA AS tel ON tel.id_tela = pro.id_tela
            INNER JOIN DETALLE_IMAGEN_PRODUCTO AS dip ON dip.id_producto = pro.id_producto
            INNER JOIN IMAGEN_PRODUCTO AS img ON img.id_imagen = dip.id_imagen
            WHERE pro.id_producto = %s 
            """,
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
                    WHEN imagen_producto LIKE '%%_frente%%' THEN 1
                    WHEN imagen_producto LIKE '%%_izquierda%%' THEN 2
                    WHEN imagen_producto LIKE '%%_derecha%%' THEN 3
                    WHEN imagen_producto LIKE '%%_atras%%' THEN 4
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


def eliminar_producto(id_producto):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        # Primero elimina las relaciones con imágenes
        cursor.execute(
            "DELETE FROM DETALLE_IMAGEN_PRODUCTO WHERE id_producto = %s", (id_producto,)
        )

        # Opcional: eliminar las imágenes que ya no están relacionadas con ningún producto
        # (esto es más avanzado, por ahora puedes omitirlo)

        # Finalmente elimina el producto
        cursor.execute("DELETE FROM PRODUCTO WHERE id_producto = %s", (id_producto,))

    conexion.commit()
    conexion.close()
