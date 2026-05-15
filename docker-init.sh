#!/bin/bash
# ============================================================
# docker-init.sh — Primera vez o rebuild completo
# Ejecutar desde la raíz del monorepo: bash docker-init.sh
# ============================================================

set -e  # Para si algo falla

echo "📦 [1/5] Compilando React..."
cd frontend
npm install
npm run build
cd ..

echo "📁 [2/5] Copiando build de React a backend/public/..."
# Borra build anterior si existe
rm -rf backend/public/assets
rm -f backend/public/index.html backend/public/vite.svg

# Copia el dist de Vite
cp -r frontend/dist/. backend/public/

echo "⚙️  [3/5] Preparando .env de Docker..."
cp backend/.env.docker backend/.env

echo "🐳 [4/5] Levantando contenedores..."
docker compose up -d --build

echo "⏳  Esperando a que MySQL esté listo..."
sleep 10

echo "🗃️  [5/5] Instalando dependencias PHP y ejecutando migraciones..."
docker compose exec php composer install
docker compose exec php php artisan key:generate --force
docker compose exec php php artisan migrate --force
docker compose exec php php artisan db:seed --force  # Quita esta línea si no tienes seeders
docker compose exec php php artisan storage:link
docker compose exec php php artisan optimize

echo ""
echo "✅ Todo listo. Abre http://localhost:8080"