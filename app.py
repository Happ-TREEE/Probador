from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('demo_colores_v1.html')


if __name__ == '__main__':
    app.run(debug=True)
