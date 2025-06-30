from bd import obtener_conexion
from datetime import datetime
from typing import List, Optional


def registrar_pedido_con_pago(
    id_persona: int,
    monto: float,
    id_tipo_pago: int,
    medio: str,
    productos: List[int],
    codigo_verificacion: Optional[str] = None,
) -> bool:
    """Registra un pedido, los productos asociados y el pago en una única transacción.

    Retorna True si la operación se completa correctamente. En caso de error
    realiza *rollback* y devuelve False.
    """
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            # 1. Crear pedido
            cursor.execute(
                """
                INSERT INTO PEDIDO(fecha_registro, id_persona)
                VALUES (NOW(), %s)
                """,
                (id_persona,),
            )
            id_pedido = cursor.lastrowid

            # 2. Asignar productos al pedido
            productos_unicos = list(set(productos))
            for id_producto in productos_unicos:
                cursor.execute(
                    """
                    INSERT INTO PRODUCTO_PEDIDO(id_producto, id_pedido)
                    VALUES (%s, %s)
                    """,
                    (id_producto, id_pedido),
                )

            # 3. Registrar pago
            cursor.execute(
                """
                INSERT INTO PAGO(monto, id_pedido, id_tipo_pago, medio, cod_verificacion)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (monto, id_pedido, id_tipo_pago, medio, codigo_verificacion),
            )
        conexion.commit()
        return True
    except Exception as exc:
        conexion.rollback()
        print("[ERROR registrar_pedido_con_pago]", exc)
        return False
    finally:
        conexion.close()
