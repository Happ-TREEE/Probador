import hashlib
import random
from flask import Blueprint, request, redirect, render_template, make_response, session, jsonify, url_for
import controladores.controlador_usuario as controlador_usuario
from controladores.controlador_verificacion_gmail import enviar_codigo_verificacion, validar_codigo
from bd import obtener_conexion

router_login = Blueprint('router_login', __name__)

@router_login.route("/login", methods=["GET", "POST"])
def login():
    try:
        username = request.cookies.get('username')
        token = request.cookies.get('token')
        usuario = controlador_usuario.obtener_usuario_por_username(username)
        
        if username is None:
            return render_template("login.html")
        
        # Obtener foto de perfil
        foto_perfil = controlador_usuario.obtener_foto_perfil(username)  # Llama a la función para obtener la foto de perfil
        print(foto_perfil)  # Agrega este print para verificar el valor
        
        if token == usuario[3] and usuario[4] == 1:
            return render_template("index_admin.html", esSesionIniciada=True, foto_perfil=foto_perfil)
        elif token == usuario[3] and usuario[4] == 2:
            return render_template("inicio.html", esSesionIniciada=True, usuario=usuario, foto_perfil=foto_perfil)
        
        return render_template("login.html")
    except Exception as e:
        print(f"Error: {e}")
        return render_template("login.html")



@router_login.route("/logout")
def logout():
    resp = make_response(redirect("/inicio"))
    resp.set_cookie('token', '', expires=0)
    return resp

@router_login.route("/registrar_usuario_cliente", methods=["POST"])
def registrar_usuario_cliente():
    username = request.form["username"]
    password = request.form["password"]
    correo = request.form.get("correo")
    captcha_input = request.form.get("captcha_input")

    expected_captcha = session.get('captcha_value')

    if expected_captcha is None:
        return jsonify({"success": False, "message": "El captcha expiró, por favor recarga la página e inténtalo de nuevo."}), 400

    if not captcha_input or captcha_input.strip().upper() != expected_captcha.upper():
        return jsonify({"success": False, "message": "Captcha incorrecto, por favor inténtalo de nuevo."}), 400

    usuario = controlador_usuario.obtener_usuario_por_username(username)
    if usuario is not None:
        return jsonify({"success": False, "message": "El usuario ya existe"}), 400

    # Encriptar contraseña
    h = hashlib.new('sha256')
    h.update(bytes(password, encoding='utf-8'))
    encpassword = h.hexdigest()

    # Generar token
    t = hashlib.new('sha256')
    entale = random.randint(1, 1024)
    t.update(bytes(str(entale), encoding='utf-8'))
    token = t.hexdigest()

    # Registrar usuario (agrega verificado=0)
    id_usuario = controlador_usuario.registrar_usuario(
        username, encpassword, 2, token, correo, verificado=0
    )

    if not id_usuario:
        return jsonify({"success": False, "message": "Error al registrar usuario"}), 500

    # Enviar código de verificación
    if not enviar_codigo_verificacion(correo):
        return jsonify({"success": False, "message": "Error al enviar código de verificación"}), 500

    # Eliminar captcha de sesión tras registro
    session.pop('captcha_value', None)

    # Enviar éxito para que JS abra modal con email
    return jsonify({"success": True, "email": correo}), 200


def registrar_usuario(username, password, id_tipo_usuario, token, correo):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                "INSERT INTO USUARIO(user, password, id_tipo_usuario, token, correo) VALUES (%s, %s, %s, %s, %s)",
                (username, password, id_tipo_usuario, token, correo)
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


@router_login.route('/guardar_captcha', methods=['POST'])
def guardar_captcha():
    data = request.get_json()
    captcha = data.get('captcha', '').strip().upper()  # Aseguramos mayúsculas y sin espacios
    session['captcha_value'] = captcha
    return '', 204  # Respuesta vacía con status 204 No Content

@router_login.route('/verificar_codigo', methods=['POST'])
def verificar_codigo():
    data = request.get_json()
    email = data.get('email')
    codigo = data.get('codigo')

    if validar_codigo(email, codigo):
        # Actualizar campo verificado en la base de datos
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute(
                    "UPDATE USUARIO SET verificado = 1 WHERE correo = %s",
                    (email,)
                )
                conexion.commit()
        except Exception as e:
            print("Error actualizando verificación:", e)
            return jsonify({"success": False, "message": "Error al actualizar verificación"}), 500
        finally:
            conexion.close()

        return jsonify({"success": True, "message": "Correo verificado correctamente"})
    else:
        return jsonify({"success": False, "message": "Código incorrecto"}), 400


@router_login.route("/procesar_login", methods=["POST"])
def procesar_login():
    username = request.form["username"]
    password = request.form["password"]
    usuario = controlador_usuario.obtener_usuario_por_username(username)
    if usuario is None:
        return render_template("login.html")
    else:
        h = hashlib.new('sha256')
        h.update(bytes(password, encoding='utf-8'))
        encpassword = h.hexdigest()
        if encpassword == usuario[2]:
            t = hashlib.new('sha256')
            entale = random.randint(1, 1024)
            t.update(bytes(str(entale), encoding='utf-8'))
            token = t.hexdigest()
            if usuario[4] == 1:
                resp = make_response(redirect("/inicio_admin"))
                resp.set_cookie('username', username)
                resp.set_cookie('token', token)
                controlador_usuario.actualizar_token_por_username(username, token)
                return resp
            elif usuario[4] == 2:
                resp = make_response(redirect("/inicio"))
                resp.set_cookie('username', username)
                resp.set_cookie('token', token)
                controlador_usuario.actualizar_token_por_username(username, token)
                return resp
        return render_template("login.html")
