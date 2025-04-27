CREATE TABLE TIPO_PERSONA (
    id_tipo_persona INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

CREATE TABLE TIPO_USUARIO (
    id_tipo_usuario INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE USUARIO (
    id_usuario INT(10) AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token varchar(255) NOT NULL,
    id_tipo_usuario INT(10),
    FOREIGN KEY (id_tipo_usuario) REFERENCES TIPO_USUARIO(id_tipo_usuario)
);
CREATE TABLE PERSONA (
    id_persona INT(10) AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(8) UNIQUE,
    RUC INT(11) UNIQUE,
    razon_social VARCHAR(100),
    nombre VARCHAR(50),
    ape_paterno VARCHAR(50),
    ape_materno VARCHAR(50),
    sexo CHAR(1),
    direccion VARCHAR(255),
    numero_telefono VARCHAR(15),
    email VARCHAR(100),
    id_tipo_persona INT(10),
    id_usuario INT(10),
    FOREIGN KEY (id_tipo_persona) REFERENCES TIPO_PERSONA(id_tipo_persona),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE PEDIDO (
    id_pedido INT(10) AUTO_INCREMENT PRIMARY KEY,
    fecha_registro DATETIME,
    fecha_envio DATE,
    fecha_entrega DATE,
    id_persona INT(10),
    FOREIGN KEY (id_persona) REFERENCES PERSONA(id_persona)
);

CREATE TABLE TIPO_PAGO (
	id_tipo_pago INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

CREATE TABLE PAGO (
    id_pago INT(10) AUTO_INCREMENT PRIMARY KEY,
    monto DECIMAL(10, 2),
    id_pedido INT(10),
    id_tipo_pago INT(10),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido),
    FOREIGN KEY (id_tipo_pago) REFERENCES TIPO_PAGO(id_tipo_pago)
);

CREATE TABLE CATEGORIA (
    id_categoria INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE COLOR (
    id_color INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUCTO (
    id_producto INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    imagen VARCHAR(255),
    notas TEXT,
    id_categoria INT(10),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE PRODUCTO_COLOR (
    id_producto INT(10),
    id_color INT(10),
    PRIMARY KEY (id_producto, id_color),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_color) REFERENCES COLOR(id_color)
);

CREATE TABLE TELA (
    id_tela INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_producto INT(10),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

CREATE TABLE PROCESO_QUIMICO (
    id_proceso_quimico INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE PROCESO_QUIMICO_TELA (
    id_proceso_quimico INT(10),
    id_tela INT(10),
    PRIMARY KEY (id_proceso_quimico, id_tela),
    FOREIGN KEY (id_proceso_quimico) REFERENCES PROCESO_QUIMICO(id_proceso_quimico),
    FOREIGN KEY (id_tela) REFERENCES TELA(id_tela)
);

CREATE TABLE TALLA (
    id_talla INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE PRODUCTO_TALLA (
    id_producto INT(10),
    id_talla INT(10),
    PRIMARY KEY (id_producto, id_talla),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_talla) REFERENCES TALLA(id_talla)
);

CREATE TABLE TIPO_ACCESORIO (
    id_tipo_accesorio INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE ACCESORIO (
    id_accesorio INT(10) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_producto INT(10),
    id_tipo_accesorio INT(10),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_tipo_accesorio) REFERENCES TIPO_ACCESORIO(id_tipo_accesorio)
);

CREATE TABLE IMAGEN (
    id_imagen INT(10) AUTO_INCREMENT PRIMARY KEY,
    imagen VARCHAR(255) NOT NULL,
	id_accesorio INT(10),
    FOREIGN KEY (id_accesorio) REFERENCES ACCESORIO(id_accesorio)
);