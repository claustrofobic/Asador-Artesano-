# Asador Artesano — Frontend

Interfaz de usuario desarrollada con **React + Vite** para la web de pedidos online de Pollos Asados Moraga.

**Autora:** Claudia Moraga Cruz  
**Proyecto:** Trabajo de Fin de Grado

---

## Tecnologías

- React 18
- Vite
- React Router DOM
- Context API (autenticación y carrito)

---

## Requisitos previos

- Node.js 18 o superior
- El backend debe estar corriendo en `http://localhost:8000`

---

## Instalación

1. Clona el repositorio:
```bash
   git clone <url-del-repositorio>
   cd frontend
```

2. Instala las dependencias:
```bash
   npm install
```

---

## Arrancar el servidor

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## Páginas

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| / | Página de inicio | No |
| /carta | Carta de productos | No |
| /quienes-somos | Historia de la empresa | No |
| /login | Iniciar sesión | No |
| /registro | Crear cuenta | No |
| /mis-pedidos | Pedidos del usuario | Sí |

---

## Estructura del proyecto