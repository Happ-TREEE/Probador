from bd import obtener_conexion
import hashlib
import os
from utilidades import guardar_imagen_webp
from werkzeug.utils import secure_filename

def obtener_perfil_admin(username):
    """
    Obtiene toda la información del perfil del administrador
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                """SELECT id_usuario, user, correo, foto_perfil 
                   FROM USUARIO 
                   WHERE user = %s AND id_tipo_usuario = 1""", 
                (username,))
            perfil = cursor.fetchone()
            return perfil
    except Exception as e:
        print(f"Error al obtener perfil admin: {e}")
        return None
    finally:
        conexion.close()

def actualizar_perfil_admin(username, datos_actualizacion):
    """
    Actualiza los datos del perfil del administrador
    datos_actualizacion: dict con campos a actualizar
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            # Construir la consulta dinámicamente
            campos = []
            valores = []
            
            if 'nuevo_username' in datos_actualizacion:
                campos.append("user = %s")
                valores.append(datos_actualizacion['nuevo_username'])
            
            if 'correo' in datos_actualizacion:
                campos.append("correo = %s")
                valores.append(datos_actualizacion['correo'])
            
            if 'nueva_password' in datos_actualizacion:
                # Encriptar la nueva contraseña
                h = hashlib.new('sha256')
                h.update(bytes(datos_actualizacion['nueva_password'], encoding='utf-8'))
                encpassword = h.hexdigest()
                campos.append("password = %s")
                valores.append(encpassword)
            
            if 'foto_perfil' in datos_actualizacion:
                campos.append("foto_perfil = %s")
                valores.append(datos_actualizacion['foto_perfil'])
            
            if campos:
                query = f"UPDATE USUARIO SET {', '.join(campos)} WHERE user = %s AND id_tipo_usuario = 1"
                valores.append(username)
                cursor.execute(query, tuple(valores))
                conexion.commit()
                return True
            return False
    except Exception as e:
        print(f"Error al actualizar perfil admin: {e}")
        conexion.rollback()
        return False
    finally:
        conexion.close()

def cambiar_foto_perfil(username, archivo_foto):
    """
    Maneja la subida y actualización de la foto de perfil
    Devuelve el nombre del archivo guardado o None si hay error
    """
    if not archivo_foto or not allowed_file(archivo_foto.filename):
        return None
    
    try:
        # Guardar la imagen y obtener el nombre del archivo
        nombre_archivo = guardar_imagen_perfil(archivo_foto)
        
        # Actualizar en la base de datos
        if actualizar_perfil_admin(username, {'foto_perfil': nombre_archivo}):
            return nombre_archivo
        return None
    except Exception as e:
        print(f"Error al cambiar foto de perfil: {e}")
        return None

def guardar_imagen_perfil(archivo_foto):
    """
    Guarda la imagen de perfil en el sistema de archivos
    Devuelve el nombre del archivo guardado
    """
    # Usar la función guardar_imagen_webp que ya existe en utilidades
    return guardar_imagen_webp(archivo_foto)

def allowed_file(filename):
    """
    Verifica si la extensión del archivo es permitida
    """
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def verificar_password_actual(username, password_actual):
    """
    Verifica si la contraseña actual proporcionada es correcta
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                "SELECT password FROM USUARIO WHERE user = %s AND id_tipo_usuario = 1", 
                (username,))
            resultado = cursor.fetchone()
            if resultado:
                # Encriptar la contraseña proporcionada para comparar
                h = hashlib.new('sha256')
                h.update(bytes(password_actual, encoding='utf-8'))
                encpassword = h.hexdigest()
                return encpassword == resultado[0]
            return False
    except Exception as e:
        print(f"Error al verificar contraseña: {e}")
        return False
    finally:
        conexion.close()