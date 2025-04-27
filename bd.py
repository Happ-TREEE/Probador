import pymysql

def obtener_conexion():
    return pymysql.connect(host='probadorvirtual-angellof-47df.l.aivencloud.com',
                                user='avnadmin',
                                password='AVNS_CE_xd9CniiLOzOi-XvU',
                                port=11852,
                                db='probador',)