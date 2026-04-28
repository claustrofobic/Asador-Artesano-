# Asador Artesano — Backend

API REST desarrollada con **Laravel 12** para la gestión de pedidos online de Pollos Asados Moraga.

**Autora:** Claudia Moraga Cruz  
**Proyecto:** Trabajo de Fin de Grado

---

## Tecnologías

- PHP 8.2
- Laravel 12
- MySQL
- Laravel Sanctum (autenticación por tokens)

---

## Requisitos previos

- PHP 8.2 o superior
- Composer
- MySQL (XAMPP o similar)

---

## Instalación

1. Clona el repositorio:
```bash
   git clone <url-del-repositorio>
   cd backend
```

2. Instala las dependencias:
```bash
   composer install
```

3. Copia el archivo de entorno:
```bash
   cp .env.example .env
```

4. Genera la clave de la aplicación:
```bash
   php artisan key:generate
```

5. Configura la base de datos en `.env`:
```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=asador_artesano
   DB_USERNAME=root
   DB_PASSWORD=
```

6. Ejecuta las migraciones:
```bash
   php artisan migrate
```

7. Importa los datos iniciales desde `sql/crear_base_datos.sql` en phpMyAdmin.

---

## Arrancar el servidor

```bash
php artisan serve
```

La API estará disponible en `http://localhost:8000`

---

## Endpoints principales

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /api/platos | Lista categorías y platos | No |
| POST | /api/login | Iniciar sesión | No |
| POST | /api/registro | Registrar usuario | No |
| GET | /api/mis-pedidos | Pedidos del usuario | Sí |
| POST | /api/mis-pedidos | Crear pedido | Sí |
| POST | /api/logout | Cerrar sesión | Sí |

Las rutas protegidas requieren el header:
