from bd import obtener_conexion
import hashlib

def obtener_usuarios():
    conexion = obtenerConexion()
    usuario= None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT select id_usuario,user,password,token FROM USUARIO")
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def obtener_usuario_por_id(id):
    conexion = obtenerConexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id_usuario,user,password,token FROM USUARIO WHERE id_usuario = %s", (id,))
        usuario = cursor.fetchone()
    conexion.close()
    return usuario

def actualizar_token(id, token):
    conexion = obtenerConexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE usuario SET token = %s WHERE id = %s",
                       (token, id))
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

