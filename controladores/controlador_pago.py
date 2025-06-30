from bd import obtener_conexion
from datetime import datetime
from typing import List, Optional

def registrar_pedido_con_pago(
    numero_documento: str,
    tipo_documento: int,
    tipo_persona: int,
    nombre_cliente: str,
    email: str,
    monto: float,
    id_tipo_pago: int,
    medio: str,
    productos: List[int],
    codigo_verificacion: Optional[str] = None,
) -> bool:
    """Registra una persona (si no existe), un pedido, los productos y el pago en una única transacción."""
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:

            # 1. Buscar si ya existe la persona (por DNI o RUC)
            if tipo_documento == 1:  # DNI
                cursor.execute("SELECT id_persona FROM PERSONA WHERE DNI = %s", (numero_documento,))
            else:  # RUC
                cursor.execute("SELECT id_persona FROM PERSONA WHERE RUC = %s", (numero_documento,))

            resultado = cursor.fetchone()

            if resultado:
                id_persona = resultado[0]
            else:
                # 2. Insertar persona si no existe
                if tipo_persona == 1:  # Persona natural
                    cursor.execute("""
                        INSERT INTO PERSONA (DNI, nombre, email, id_tipo_persona)
                        VALUES (%s, %s, %s, %s)
                    """, (numero_documento, nombre_cliente, email, tipo_persona))
                else:  # Persona jurídica
                    cursor.execute("""
                        INSERT INTO PERSONA (RUC, razon_social, email, id_tipo_persona)
                        VALUES (%s, %s, %s, %s)
                    """, (numero_documento, nombre_cliente, email, tipo_persona))

                id_persona = cursor.lastrowid

            # 3. Crear pedido
            cursor.execute("""
                INSERT INTO PEDIDO(fecha_registro, id_persona)
                VALUES (NOW(), %s)
            """, (id_persona,))
            id_pedido = cursor.lastrowid

            # 4. Asignar productos
            productos_unicos = list(set(productos))
            for id_producto in productos_unicos:
                cursor.execute("""
                    INSERT INTO PRODUCTO_PEDIDO(id_producto, id_pedido)
                    VALUES (%s, %s)
                """, (id_producto, id_pedido))

            # 5. Registrar pago
            cursor.execute("""
                INSERT INTO PAGO(monto, id_pedido, id_tipo_pago, medio, cod_verificacion)
                VALUES (%s, %s, %s, %s, %s)
            """, (monto, id_pedido, id_tipo_pago, medio, codigo_verificacion))

        conexion.commit()
        return True
    except Exception as exc:
        conexion.rollback()
        print("[ERROR registrar_pedido_con_pago]", exc)
        return False
    finally:
        conexion.close()
