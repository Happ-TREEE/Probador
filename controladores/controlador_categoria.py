from bd import obtener_conexion

def obtener_categorias():
    conexion = obtener_conexion()
    categorias = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id_categoria, nombre FROM CATEGORIA")
        categorias = cursor.fetchall()
    conexion.close()
    return categorias