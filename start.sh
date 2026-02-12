#!/bin/bash

# Sobe os containers em background
echo "🚀 Iniciando os serviços do TicketNow via Docker..."
docker-compose up -d

# Aguarda 2 segundos para dar tempo dos servidores iniciarem os listeners
sleep 2

# Abre o navegador automaticamente (detecta Linux ou macOS)
if command -v xdg-open > /dev/null; then
  echo "🌐 Abrindo Frontend e Storybook..."
  xdg-open http://localhost:3000
  xdg-open http://localhost:6006
elif command -v open > /dev/null; then
  echo "🌐 Abrindo Frontend e Storybook..."
  open http://localhost:3000
  open http://localhost:6006
else
  echo "⚠️  Não foi possível abrir o navegador automaticamente. Acesse:"
  echo "👉 Frontend: http://localhost:3000"
  echo "👉 Storybook: http://localhost:6006"
fi

echo "✅ Tudo pronto! Containers rodando em background."
