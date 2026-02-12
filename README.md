# TicketNow - Sistema de Compra de Ingressos

Sistema full-stack de compra de ingressos com frontend em Next.js + Material UI e backend em NestJS + PostgreSQL.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15, Material UI 6, TypeScript |
| Backend | NestJS 11, TypeORM, PostgreSQL |
| Infra | Docker, Docker Compose |
| Testes | Jest, Testing Library |
| Docs | Storybook |

## Quick Start

### Com Docker (recomendado)

```bash
docker-compose up --build
```

Acesse:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Storybook: rode `cd frontend && npm run storybook`

### Seed do banco

Após subir o Docker, popule o banco com eventos de exemplo:

```bash
docker-compose exec backend npx ts-node src/database/seed.ts
```

### Desenvolvimento local

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend (outro terminal)
cd frontend
npm install
npm run dev
```

## Testes

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test
```

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /events | Lista todos os eventos |
| GET | /events/:id | Detalhes de um evento |
| POST | /orders | Cria um pedido |
| GET | /orders/:id | Detalhes de um pedido |

## Estrutura

```
├── frontend/           # Next.js App Router
│   ├── src/
│   │   ├── app/        # Páginas (lista + checkout)
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── stories/    # Storybook stories
│   │   ├── __tests__/  # Testes unitários
│   │   ├── theme/      # Material UI theme
│   │   ├── lib/        # Axios client
│   │   └── types/      # TypeScript types
│   ├── Dockerfile
│   └── .storybook/
├── backend/            # NestJS
│   ├── src/
│   │   ├── events/     # Módulo de eventos
│   │   ├── orders/     # Módulo de pedidos
│   │   └── database/   # Seed
│   └── Dockerfile
└── docker-compose.yml
```
