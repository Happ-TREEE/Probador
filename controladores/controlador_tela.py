from bd import obtener_conexion

def obtener_telas():
    conexion = obtener_conexion()
    telas = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id_tela, nombre FROM TELA ORDER BY nombre ASC")
        telas = cursor.fetchall()
    conexion.close()
    return telas
