from bd import obtener_conexion


def obtener_categorias():
    conexion = obtener_conexion()
    categorias = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_categoria, nombre, vigencia FROM CATEGORIA")
        categorias = cursor.fetchall()
    conexion.close()
    return categorias


def registrar_categoria(nombre):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "INSERT INTO CATEGORIA (nombre) VALUES (%s)",
            (nombre),
        )
    conexion.commit()
    conexion.close()


def modificar_categoria(id_categoria, nombre, vigencia):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "UPDATE CATEGORIA SET nombre = %s, vigencia = %s WHERE id_categoria = %s",
            (nombre, vigencia, id_categoria),
        )
    conexion.commit()
    conexion.close()


def eliminar_categoria(id_categoria):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM CATEGORIA WHERE id_categoria = %s", (id_categoria,))
    conexion.commit()
    conexion.close()
