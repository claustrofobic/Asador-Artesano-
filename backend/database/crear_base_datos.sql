-- ============================================
--  ASADOR ARTESANO — Script de Base de Datos
--  Ejecutar en phpMyAdmin o MySQL CLI
-- ============================================

CREATE DATABASE IF NOT EXISTS asador_artesano
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE asador_artesano;

-- --------------------------------------------
-- 1. USUARIOS (clientes)
-- --------------------------------------------
CREATE TABLE usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(120)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  telefono      VARCHAR(30),
  password_hash VARCHAR(255)  NOT NULL,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- 2. ADMINISTRADORES / EMPLEADOS
-- --------------------------------------------
CREATE TABLE admin_usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(120)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  rol           ENUM('admin', 'cocina', 'sala') DEFAULT 'sala',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- 3. CATEGORÍAS DE PLATOS
-- --------------------------------------------
CREATE TABLE categorias (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  orden  INT DEFAULT 0
);

-- --------------------------------------------
-- 4. ALÉRGENOS
-- --------------------------------------------
CREATE TABLE alergenos (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Datos iniciales de alérgenos (obligatorio por ley)
INSERT INTO alergenos (nombre) VALUES
  ('Gluten'), ('Crustáceos'), ('Huevos'), ('Pescado'),
  ('Cacahuetes'), ('Soja'), ('Lácteos'), ('Frutos de cáscara'),
  ('Apio'), ('Mostaza'), ('Sésamo'), ('Dióxido de azufre'),
  ('Altramuces'), ('Moluscos');

-- --------------------------------------------
-- 5. PLATOS
-- --------------------------------------------
CREATE TABLE platos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT,
  nombre       VARCHAR(150)   NOT NULL,
  descripcion  TEXT,
  precio       DECIMAL(8,2)   NOT NULL,
  imagen_url   VARCHAR(255),
  disponible   BOOLEAN        DEFAULT TRUE,
  created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- --------------------------------------------
-- 6. RELACIÓN PLATOS ↔ ALÉRGENOS (N:M)
-- --------------------------------------------
CREATE TABLE plato_alergenos (
  plato_id    INT,
  alergeno_id INT,
  PRIMARY KEY (plato_id, alergeno_id),
  FOREIGN KEY (plato_id)    REFERENCES platos(id)    ON DELETE CASCADE,
  FOREIGN KEY (alergeno_id) REFERENCES alergenos(id) ON DELETE CASCADE
);

-- --------------------------------------------
-- 7. PEDIDOS
-- --------------------------------------------
CREATE TABLE pedidos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id    INT NULL,   -- NULL = pedido como invitado
  nombre_guest  VARCHAR(120),
  telefono_guest VARCHAR(30),
  total         DECIMAL(10,2) NOT NULL,
  hora_recogida DATETIME      NOT NULL,
  estado        ENUM('recibido','en_preparacion','listo','entregado','cancelado')
                DEFAULT 'recibido',
  medio_pago    ENUM('tarjeta','tpv_virtual','pago_en_local') DEFAULT 'pago_en_local',
  notas         TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_hora_recogida (hora_recogida),
  INDEX idx_estado (estado)
);

-- --------------------------------------------
-- 8. LÍNEAS DE PEDIDO
-- --------------------------------------------
CREATE TABLE pedido_items (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id       INT NOT NULL,
  plato_id        INT NOT NULL,
  cantidad        INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(8,2) NOT NULL,
  observaciones   VARCHAR(255),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (plato_id)  REFERENCES platos(id)  ON DELETE RESTRICT
);

-- --------------------------------------------
-- 9. CONFIGURACIÓN DEL RESTAURANTE
-- --------------------------------------------
CREATE TABLE configuracion (
  clave VARCHAR(100) PRIMARY KEY,
  valor TEXT NOT NULL
);

-- Valores iniciales
INSERT INTO configuracion (clave, valor) VALUES
  ('horario_apertura',   '12:00'),
  ('horario_cierre',     '22:00'),
  ('cupo_por_hora',      '10'),
  ('minutos_antelacion', '30'),
  ('nombre_restaurante', 'El Asador Artesano'),
  ('telefono_contacto',  '967000000'),
  ('direccion',          'Calle Ejemplo, 1 - Albacete');

-- --------------------------------------------
-- 10. DATOS DE EJEMPLO (opcional, borrar en producción)
-- --------------------------------------------
INSERT INTO categorias (nombre, orden) VALUES
  ('Pollos y Asados', 1),
  ('Churrería',       2),
  ('Croquetas',       3),
  ('Bebidas',         4);

INSERT INTO platos (categoria_id, nombre, descripcion, precio, disponible) VALUES
  (1, 'Pollo asado entero',    'Pollo de corral asado al horno con especias tradicionales', 12.00, TRUE),
  (1, 'Medio pollo asado',     'Media ración de nuestro pollo asado',                        6.50, TRUE),
  (2, 'Churros (ración)',      'Churros recién hechos, crujientes por fuera y tiernos por dentro', 3.50, TRUE),
  (2, 'Porras (ración)',       'Porras artesanales, perfectas para mojar',                   3.50, TRUE),
  (3, 'Croquetas caseras (6)', 'Croquetas de jamón ibérico, receta de la abuela',             6.00, TRUE),
  (4, 'Refresco',              'Coca-Cola, Fanta o Agua',                                    1.50, TRUE);
