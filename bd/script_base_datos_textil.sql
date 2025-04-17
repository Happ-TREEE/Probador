
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255),
    tipo_usuario ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DireccionEnvio (
    id_direccion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    direccion TEXT,
    referencia TEXT,
    codigo_postal VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio_base DECIMAL(10,2),
    tipo VARCHAR(50),
    material VARCHAR(50),
    eco_friendly BOOLEAN DEFAULT FALSE,
    imagen_url TEXT,
    stock INT DEFAULT 0
);

CREATE TABLE MedidaCliente (
    id_medida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    altura DECIMAL(5,2),
    pecho DECIMAL(5,2),
    cintura DECIMAL(5,2),
    cadera DECIMAL(5,2),
    hombros DECIMAL(5,2),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    total DECIMAL(10,2),
    metodo_envio VARCHAR(50),
    tracking VARCHAR(100),
    id_direccion INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_direccion) REFERENCES DireccionEnvio(id_direccion)
);

CREATE TABLE DetallePedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    personalizacion_texto TEXT,
    tipo_personalizacion ENUM('bordado', 'estampado'),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE HistorialPedido (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_pedido INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    accion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
);

CREATE TABLE PuntosFidelidad (
    id_fidelidad INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    puntos_acumulados INT DEFAULT 0,
    nivel_cliente ENUM('bronze', 'silver', 'gold') DEFAULT 'bronze',
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Asesoria (
    id_asesoria INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    nota_cliente TEXT,
    respuesta_admin TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE RecomendacionIA (
    id_recomendacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_producto INT,
    motivo TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);
