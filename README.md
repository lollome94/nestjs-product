# products-service

Backend NestJS + Sequelize (MySQL) per gestire prodotti.

## Cosa fa

- CRUD prodotti
- paginazione su lista prodotti
- validazione input (class-validator)
- errori HTTP chiari (400, 404, 409)
- test unit, integration, e2e

## Setup veloce

1. Installa dipendenze

```bash
npm install
```

2. Crea il file `.env` partendo da `.env.example`

```bash
copy .env.example .env
```

3. Avvia MySQL e crea il database `ecommerce`

4. Esegui migration

```bash
npm run db:migrate
```

5. Avvia il servizio

```bash
npm run start:dev
```

Base URL: `http://127.0.0.1:3000`

## Configurazione (.env)

Variabili usate:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
```

Nota: ora app e migration leggono automaticamente `.env`.

## Endpoint

- `POST /products`
- `GET /products?page=1&limit=10`
- `GET /products/:id`
- `PUT /products/:id/stock`
- `DELETE /products/:id`

Esempi pronti all'uso: `products.http`

## Test

```bash
npm run test
npm run test:integration
npm run test:e2e
npm run test:all
```

## File utili

- Architettura: `docs/agentic-clean-architecture-nestjs.md`
- Migration: `migrations/20260309000100-create-products.js`
- Model Sequelize: `src/modules/product/infrastructure/persistence/models/product.model.ts`
- Load test: `k6/products-load.js`
- Skills: `.github/skills/`
