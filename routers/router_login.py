# import jwt
# import datetime
import hashlib
import random
from flask import Blueprint, request, redirect, url_for, render_template, flash, session, make_response, current_app
import controladores.controlador_usuario as controlador_usuario

router_login = Blueprint('router_login', __name__)

@router_login.route("/login", methods=["GET", "POST"])
def login():
    try:
        #Obtener el usuario y token de las cookies
        username = request.cookies.get('username')
        token = request.cookies.get('token')
        usuario = controlador_usuario.obtener_usuario_por_username(username)
        #Si el usuario no existe, redirigir a login
        if username is None:
            return render_template("login.html")

        #Redigirir si el usuario es administrador
        if token == usuario[3] and usuario[4] == 1:
            return render_template("index_admin.html", esSesionIniciada=True)

        #Redigirir si el usuario es cliente
        elif token == usuario[3] and usuario[4] == 2:
            return render_template("inicio.html", esSesionIniciada=True, usuario=usuario)

        return render_template("login.html")

    except:
        #Si el usuario no está logeado y no hay coockies con su cuenta, redirigir a login
        return render_template("login.html")


@router_login.route("/logout")
def logout():
    #Redirigir a login y borrar el token de las cookies
    resp = make_response(redirect("/inicio"))
    resp.set_cookie('token', '', expires=0)
    return resp


@router_login.route("/registrar_usuario_cliente", methods=["POST"])
def registrar_usuario_cliente():
    #Obtener el usuario y contraseña del formulario de login
    username = request.form["username"]
    password = request.form["password"]
    tipo_usuario = 2
    usuario = controlador_usuario.obtener_usuario_por_username(username)
    #Si el usuario existe recargar la pagina
    if usuario != None:
        return render_template("login.html")
    else:
        # Encriptar password ingresado por usuario
        h = hashlib.new('sha256')
        h.update(bytes(password, encoding='utf-8'))
        encpassword = h.hexdigest()
        # Genera token encriptado
        t = hashlib.new('sha256')
        entale = random.randint(1, 1024)
        strEntale = str(entale)
        t.update(bytes(strEntale, encoding='utf-8'))
        token = t.hexdigest()
        # Registrar el usuario en la BD
        controlador_usuario.registrar_usuario(username, encpassword, tipo_usuario, token)
    return redirect("/inicio")


@router_login.route("/procesar_login", methods=["POST"])
def procesar_login():
    #Obtener el usuario y contraseña del formulario de login
    username = request.form["username"]
    password = request.form["password"]
    usuario = controlador_usuario.obtener_usuario_por_username(username)

    #Si el usuario no existe redirigir a login
    if usuario == None:
        return render_template("login.html")
    else:
        # Encriptar password ingresado por usuario
        h = hashlib.new('sha256')
        h.update(bytes(password, encoding='utf-8'))
        encpassword = h.hexdigest()
        # Verificar si la contraseña ingresada coincide con la contraseña del usuario
        if encpassword == usuario[2]:
            # Genera token encriptado
            t = hashlib.new('sha256')
            entale = random.randint(1, 1024)
            strEntale = str(entale)
            t.update(bytes(strEntale, encoding='utf-8'))
            token = t.hexdigest()
            #Si el usuario es administrador, crear y asignar token, crear cockies y redirigir
            if usuario[4] == 1:
                resp = make_response(redirect("/inicio_admin"))
                resp.set_cookie('username', username)
                resp.set_cookie('token', token)
                controlador_usuario.actualizar_token_por_username(username, token)
                return resp
            #Si el usuario es cliente, crear y asignar token, crear cockies y redirigir
            elif usuario[4] == 2:
                resp = make_response(redirect("/inicio"))
                resp.set_cookie('username', username)
                resp.set_cookie('token', token)
                controlador_usuario.actualizar_token_por_username(username, token)
                return resp

        return render_template("login.html")