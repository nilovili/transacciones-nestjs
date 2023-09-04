-- Crear la tabla "products"
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);

-- Insertar algunos productos de ejemplo
INSERT INTO products (name, price, stock) VALUES
  ('Producto 1', 10.99, 100),
  ('Producto 2', 20.49, 50),
  ('Producto 3', 5.99, 200);

-- Crear la tabla "orders"
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL
);
