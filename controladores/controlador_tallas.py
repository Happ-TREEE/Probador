from bd import obtener_conexion


def obtener_tallas():
    conexion = obtener_conexion()
    tallas = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_talla, nombre FROM TALLA")
        tallas = cursor.fetchall()
    conexion.close()
    return tallas


def obtener_tallas_por_nombre_categoria(id):
    conexion = obtener_conexion()
    tallas = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """
        SELECT ta.nombre FROM TALLA AS ta
        INNER JOIN CATEGORIA_TALLA AS det ON det.id_talla = ta.id_talla
        INNER JOIN CATEGORIA AS cat ON cat.id_categoria = det.id_categoria
        WHERE cat.nombre = %s;    
            """, (id,))
        tallas = cursor.fetchall()
    conexion.close()
    return tallas


def registrar_talla(nombre):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO TALLA (nombre) VALUES (%s)", (nombre,))
    conexion.commit()
    conexion.close()
    return True


def modificar_talla(id_talla, nombre):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "UPDATE TALLA SET nombre = %s WHERE id_talla = %s", (nombre, id_talla)
        )
    conexion.commit()
    conexion.close()
    return True


def eliminar_talla(id_talla):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM TALLA WHERE id_talla = %s", (id_talla,))
    conexion.commit()
    conexion.close()
