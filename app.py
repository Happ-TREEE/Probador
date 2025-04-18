from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/edicion_colores')
def edicion_colores():
    return render_template('edicion_colores.html')

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
