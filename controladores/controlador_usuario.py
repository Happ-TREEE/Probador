from bd import obtener_conexion
import hashlib

def registrar_usuario(username, password, id_tipo_usuario, token):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "INSERT INTO USUARIO(user, password, id_tipo_usuario, token) VALUES (%s, %s, %s, %s)",
            (username, password, id_tipo_usuario, token))
    conexion.commit()
    conexion.close()

def obtener_tipo_usuario_por_id(id):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT tip.nombre FROM TIPO_USUARIO AS tip INNER JOIN USUARIO AS usu
            ON usu.id_tipo_usuario = tip.id_tipo_usuario WHERE usu.id_usuario = %s""", (id))
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def obtener_tipo_usuario_por_username(username):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT tip.nombre FROM TIPO_USUARIO AS tip INNER JOIN USUARIO AS usu
            ON usu.id_tipo_usuario = tip.id_tipo_usuario WHERE usu.user = %s""", (username))
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def obtener_usuarios():
    conexion = obtener_conexion()
    usuario= None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id_usuario,user,password,token,id_tipo_usuario FROM USUARIO")
        usuario = cursor.fetchall()
    conexion.close()
    return usuario

def obtener_usuario_por_id(id):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id_usuario,user,password,token,id_tipo_usuario FROM USUARIO WHERE id_usuario = %s", (id,))
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def obtener_usuario_por_username(username):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id_usuario,user,password,token,id_tipo_usuario FROM USUARIO WHERE user = %s", (username,))
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def actualizar_token_por_id(id, token):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE usuario SET token = %s WHERE id = %s",
                       (token, id))
    conexion.commit()
    conexion.close()

def actualizar_token_por_username(username, token):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE USUARIO SET token = %s WHERE user = %s",
                       (token, username))
    conexion.commit()
    conexion.close()
    
# def encriptar_contraseña(contraseña):
#     return hashlib.sha256(contraseña.encode('utf-8')).hexdigest()

# def verificar_usuario(correo, contraseña):
#     conexion = obtener_conexion()
#     usuario = None
#     try:
#         with conexion.cursor() as cursor:
#             cursor.execute("SELECT * FROM Usuario WHERE correo = %s", (correo,))
#             usuario = cursor.fetchone()
#             if usuario and usuario["contraseña"] == encriptar_contraseña(contraseña):
#                 return usuario  # Autenticado
#     finally:
#         conexion.close()
#     return None  # No autenticado

# def registrar_usuario(nombre, apellido, correo, telefono, contraseña):
#     conexion = obtener_conexion()
#     try:
#         with conexion.cursor() as cursor:
#             cursor.execute(
#                 "INSERT INTO Usuario (nombre, apellido, correo, telefono, contraseña) VALUES (%s, %s, %s, %s, %s)",
#                 (nombre, apellido, correo, telefono, encriptar_contraseña(contraseña))
#             )
#         conexion.commit()
#         return True
#     except Exception as e:
#         print("Error al registrar usuario:", e)
#         return False
#     finally:
#         conexion.close()

