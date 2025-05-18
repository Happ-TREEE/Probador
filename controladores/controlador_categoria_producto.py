from bd import obtener_conexion

def obtener_categorias():
    conexion = obtener_conexion()
    categorias = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_categoria, nombre, vigencia FROM CATEGORIA ORDER BY id_categoria ASC")
        categorias = cursor.fetchall()
    conexion.close()
    return categorias

def insertar_categoria(nombre, vigencia):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO CATEGORIA (nombre, vigencia) VALUES (%s, %s)", (nombre, vigencia))
    conexion.commit()
    conexion.close()

def actualizar_categoria(id_categoria, nombre, vigencia):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE CATEGORIA SET nombre = %s, vigencia = %s WHERE id_categoria = %s", (nombre, vigencia, id_categoria))
    conexion.commit()
    conexion.close()

def eliminar_categoria(id_categoria):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM CATEGORIA WHERE id_categoria = %s", (id_categoria,))
    conexion.commit()
    conexion.close()
