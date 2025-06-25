import os
from flask import current_app
from bd import obtener_conexion
import hashlib
from controladores.controlador_perfil_admin import obtener_perfil_admin
from utilidades import redimensionar_imagen

def registrar_usuario(username, password, id_tipo_usuario, token, correo, verificado=0):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                "INSERT INTO USUARIO(user, password, id_tipo_usuario, token, correo, verificado) VALUES (%s, %s, %s, %s, %s, %s)",
                (username, password, id_tipo_usuario, token, correo, verificado)
            )
            cursor.execute("SELECT LAST_INSERT_ID()")
            id_usuario = cursor.fetchone()[0]
            conexion.commit()
        return id_usuario
    except Exception as e:
        print("Error al registrar usuario:", e)
        conexion.rollback()
        return None
    finally:
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

def obtener_usuario_sin_password(username):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            """SELECT us.id_usuario,us.user,us.token,ti.nombre FROM USUARIO as us
                INNER JOIN TIPO_USUARIO as ti ON us.id_tipo_usuario = ti.id_tipo_usuario WHERE user = %s""", (username,))
        usuario = cursor.fetchone()
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

def obtener_perfil_admin(username):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                """SELECT id_usuario, user, correo, foto_perfil 
                   FROM USUARIO 
                   WHERE user = %s AND id_tipo_usuario = 1""", 
                (username,))
            perfil = cursor.fetchone()

            # Si no tiene foto de perfil, asignar el icono por defecto
            if perfil and not perfil[3]:
                perfil = list(perfil)
                perfil[3] = 'icon_rounded_user_white.svg'  # Usar el mismo nombre en toda la app

            return perfil
    except Exception as e:
        print(f"Error al obtener perfil admin: {e}")
        return None
    finally:
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

