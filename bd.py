import pymysql

def obtener_conexion():
    return pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='72621242',
        db='bdjose',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
