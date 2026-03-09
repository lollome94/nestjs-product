# nestjs-product

This project is a backend service developed with **NestJS** for managing a product catalog. It is strictly designed following **Clean Architecture** and **Domain-Driven Design (DDD)** principles, aiming to be highly testable, maintainable, and "agent-friendly" (structured to facilitate collaboration between AI and humans).

## 🚀 Key Technologies

- **Framework:** [NestJS](https://nestjs.com/) (v11+)
- **Language:** TypeScript (v5+)
- **ORM:** [Sequelize](https://sequelize.org/) with `sequelize-typescript`
- **Database:** MySQL
- **Validation:** `class-validator` and `class-transformer`
- **Testing:** Jest, Supertest, and **Testcontainers** (for integration tests with real database instances)
- **Load Testing:** [k6](https://k6.io/)

---

## 🏗️ Project Architecture

The project follows a layered structure within the `product` module ([src/modules/product/](src/modules/product/)):

1.  **Domain Layer** ([domain/](src/modules/product/domain/)): The core of the application. Contains pure business logic, **Entities** ([product.entity.ts](src/modules/product/domain/entities/product.entity.ts)), and **Value Objects** (`Price`, `Stock`, `ProductToken`). It has no external dependencies.
2.  **Application Layer** ([application/](src/modules/product/application/)): Orchestrates business flows via **Services**. It defines **DTOs** and **Ports** (interfaces) for the infrastructure.
3.  **Infrastructure Layer** ([infrastructure/](src/modules/product/infrastructure/)): Implements the interfaces defined in the Application layer. Includes **Sequelize** models, **Repositories**, and **Mappers** to convert DB models into domain entities.
4.  **Presentation Layer** ([presentation/](src/modules/product/presentation/)): Handles HTTP requests via **Controllers**, validating inputs and mapping results into HTTP responses.

---

## 🛠️ Prerequisites and Installation

### Prerequisites
- **Node.js**: v22 or higher.
- **Docker**: Required for integration tests (Testcontainers) or to run MySQL.
- **MySQL**: If you're not using Docker for the local database.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit the .env file with your MySQL credentials
   ```

---

## 🏃 Running the Application

### Development
To start the app in watch mode (auto-reload):
```bash
npm run start:dev
```

### Production
To build and start the production version:
```bash
npm run build
npm run start:prod
```

### Database Migrations
The project uses Sequelize to manage migrations:
- Run migrations: `npm run db:migrate`
- Undo last migration: `npm run db:migrate:undo`

---

## 🛣️ API Endpoints

The main controller is exposed at `/products`. You can find ready-to-use examples in the [products.http](products.http) file.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/products` | Create a new product |
| `GET` | `/products` | List products with pagination (`?page=1&limit=10`) |
| `GET` | `/products/:id` | Get product details by numerical ID |
| `PUT` | `/products/:id/stock` | Update stock availability |
| `DELETE` | `/products/:id` | Remove a product |

---

## 🧪 Testing Strategy

The project implements several testing levels to ensure code quality:

- **Unit Tests**: Test pure logic (Entities, Value Objects, Services). Run with `npm run test`.
- **Integration Tests**: Test interaction with the real database using **Testcontainers**. Located in [test/integration/](test/integration/). Run with `npm run test:integration`.
- **E2E Tests**: Test the full HTTP request/response cycle. Run with `npm run test:e2e`.

**To run all standard tests:**
```bash
npm run test:all
```

### 📈 Load Testing (k6)
The project includes [k6](https://k6.io/) load testing scripts to benchmark performance.

The execution scripts ([scripts/](scripts/)) automate a full containerized environment for the test:
1. **Infrastructure Setup**: Creates a dedicated Docker network.
2. **Database Provisioning**: Spins up a MySQL container and waits for it to be ready.
3. **Application Build**: Builds a temporary Docker image from the current source.
4. **App Execution**: Runs the NestJS app container within the network and runs migrations.
5. **Load Test Execution**: Runs a `k6` container to perform stress tests (POST, GET, PUT, DELETE operations) against the containerized application.
6. **Cleanup**: Automatically removes all temporary containers and the network after completion.

**Run Load Tests:**
- **Cross-platform (Node/Local):** `npm run loadtest:k6` (requires local environment running)
- **Windows (Docker-based):** `npm run loadtest:k6:win`
- **macOS/Linux (Docker-based):** `npm run loadtest:k6:mac`

Test scenarios, stages, and thresholds are defined in [k6/products-load.js](k6/products-load.js).

---

## 📖 Documentation

This project uses [Compodoc](https://compodoc.app/) to generate comprehensive documentation for the NestJS application (modules, controllers, services, etc.).

### Generate Documentation
```bash
npm run doc:generate
```

### Serve Documentation
To generate and serve documentation locally with a live-reloading server (available at `http://localhost:8080`):
```bash
npm run doc:serve
```

---

## ✨ Special Notes

- **OpenSpec**: The project uses an experimental workflow based on [OpenSpec](openspec/) for managing changes via design documents, proposals, and automated tasks.
- **Strict Mapping**: A `ProductMapper` is used to ensure domain entities never leak into DB or HTTP layers, maintaining a clear separation of concerns.