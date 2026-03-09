# Agentic Clean Architecture For NestJS

This guide translates the Agentic Clean Architecture template concepts to a NestJS stack.

## Objective

Build a NestJS backend that is:
- readable for humans and AI agents
- scalable by bounded context and module boundaries
- robust in error handling and observability
- production-ready with performance and quality gates

## Core Principles

1. Keep business rules in domain and application, not in controllers or ORM models.
2. Depend on interfaces from inner layers to outer adapters.
3. Enforce architecture rules with automated checks.
4. Standardize error flow and log structure.
5. Test behavior at multiple levels, including real DB with Testcontainers.

## Suggested Layer Model

Inside each bounded context module:

```text
src/modules/{bounded-context}/
  domain/
    entities/
    value-objects/
    errors/
    events/
  application/
    commands/
    queries/
    ports/
    services/
  infrastructure/
    persistence/
    adapters/
  presentation/
    controllers/
    dto/
```

## Request Flow

1. Controller validates DTO and maps to command or query
2. Application use case executes business orchestration
3. Application calls ports
4. Infrastructure adapters implement ports using Sequelize or external services
5. Result is mapped by Presentation to HTTP response

## Error Handling Blueprint

Use explicit domain and application errors:
- business errors represented as result failures
- unexpected runtime failures captured by global exception filter

Status mapping baseline:
- ValidationError -> 400
- NotFoundError -> 404
- ConflictError -> 409
- UnauthorizedError -> 401
- ForbiddenError -> 403
- UnknownError -> 500

Response body recommendation:

```json
{
  "code": "users.email_already_exists",
  "message": "Email already exists",
  "traceId": "4e0f24e8d4b04c5f"
}
```

## Logging And Observability

Use structured logs (for example nestjs-pino) and include:
- timestamp
- level
- requestId
- userId when available
- module and useCase
- latencyMs
- error code

Observability baseline:
- health endpoints for liveness and readiness
- metrics for request rate, error rate, and latency percentiles
- traces for HTTP and database spans

## Performance Baseline

- apply pagination and limit defaults on list endpoints
- avoid N+1 includes in Sequelize
- project only required columns
- add indexes based on real query patterns
- define timeout budgets for external dependencies
- track p95 and p99 latency targets per critical endpoint

## Sequelize In Clean Architecture

Rules:
- define repository and unit-of-work interfaces in application
- implement repositories in infrastructure with Sequelize models
- keep ORM mapping code out of domain
- run migrations for schema changes, do not rely on sync in production

## Test Strategy

1. Domain unit tests
2. Application unit tests
3. Integration tests with Testcontainers and real DB
4. E2E tests over HTTP
5. Architecture tests for dependency rules

Suggested packages:
- jest
- supertest
- testcontainers
- dependency-cruiser or eslint boundaries plugin

## Agentic Skills Included In This Repo

- .github/skills/nestjs-skill/SKILL.md
- .github/skills/nestjs-architecture-overview/SKILL.md
- .github/skills/nestjs-domain-ddd-modeling/SKILL.md
- .github/skills/nestjs-cqrs-handlers/SKILL.md
- .github/skills/nestjs-api-endpoints/SKILL.md
- .github/skills/nestjs-architecture-tests/SKILL.md
- .github/skills/nestjs-error-logging-performance/SKILL.md
- .github/skills/nestjs-sequelize-persistence/SKILL.md
- .github/skills/nestjs-security-authz/SKILL.md
- .github/skills/nestjs-observability-ops/SKILL.md
- .github/skills/nestjs-testing-testcontainers/SKILL.md

## Suggested Feature Delivery Order

1. Domain model and invariants
2. Application commands or queries and validators
3. Sequelize repositories and adapters
4. Controller and DTO mapping
5. Unit tests
6. Integration tests with Testcontainers
7. E2E tests
8. Architecture checks in CI

## Minimum PR Checklist

- no business logic in controllers
- no Sequelize import in domain or application layers
- explicit error mapping policy applied
- structured logs with correlation context
- tests updated for behavior changes
- architecture checks green
- new or changed controllers include an updated `.http` file for VS Code Rest Client
