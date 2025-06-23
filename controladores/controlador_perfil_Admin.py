import hashlib
from flask import current_app
from werkzeug.utils import secure_filename
from PIL import Image
import os
from bd import obtener_conexion

def cifrar_contraseña(password):
    h = hashlib.new('sha256')  # Usar SHA-256 para el cifrado
    h.update(bytes(password, encoding='utf-8'))  # Convertir la contraseña a bytes y aplicarle SHA-256
    encpassword = h.hexdigest()  # Obtener el hash hexadecimal
    return encpassword

def obtener_perfil_admin(user_id):
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        
        consulta = """
        SELECT user, password, correo, id_tipo_usuario, foto_perfil
        FROM USUARIO
        WHERE id_usuario = %s AND id_tipo_usuario = 1
        """
        cursor.execute(consulta, (user_id,))
        
        perfil = cursor.fetchone()

        if perfil:
            return {
                'user': perfil[0],
                'password': perfil[1],
                'correo': perfil[2],
                'id_tipo_usuario': perfil[3],
                'foto_perfil': perfil[4]
            }
        else:
            return None
    except Exception as e:
        print(f"Error al obtener el perfil: {e}")
        return None
    finally:
        cursor.close()
        conexion.close()

def convertir_a_webp(foto):
    try:
        filename = secure_filename(foto.filename)
        nombre_archivo_webp = f"{os.path.splitext(filename)[0]}.webp"

        upload_folder = os.path.join(current_app.root_path, 'static', 'img', 'perfil_usuario')

        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        # Abrir y guardar la imagen en formato .webp
        with Image.open(foto) as img:
            img.save(os.path.join(upload_folder, nombre_archivo_webp), format='WEBP')

        return nombre_archivo_webp  # Devolver el nombre del archivo guardado
    except Exception as e:
        print(f"Error al convertir la imagen a .webp: {e}")
        return None

def actualizar_perfil_admin(user_id, nuevo_nombre_usuario, nuevo_correo, nueva_contraseña, foto_perfil):
    try:
        foto_webp = convertir_a_webp(foto_perfil) if foto_perfil else None
        
        # Cifrar la nueva contraseña usando SHA-256
        nueva_contraseña_cifrada = cifrar_contraseña(nueva_contraseña)

        conexion = obtener_conexion()
        cursor = conexion.cursor()
        
        consulta = """
        UPDATE USUARIO
        SET user = %s, correo = %s, password = %s, foto_perfil = %s
        WHERE id_usuario = %s
        """
        cursor.execute(consulta, (nuevo_nombre_usuario, nuevo_correo, nueva_contraseña_cifrada, foto_webp, user_id))
        
        # Confirmar los cambios
        conexion.commit()

        return True
    except Exception as e:
        print(f"Error al actualizar el perfil: {e}")
        return False
    finally:
        cursor.close()
        conexion.close()

