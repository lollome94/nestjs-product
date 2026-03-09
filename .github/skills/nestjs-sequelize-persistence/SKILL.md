---
name: nestjs-sequelize-persistence
description: Use this skill when implementing persistence in NestJS with Sequelize under Clean Architecture and DDD constraints, replacing EF Core style patterns with repository and mapping boundaries.
---

# NestJS Sequelize Persistence Skill

Persistence guidance for Sequelize in a clean, testable, and scalable architecture.

## Scope

In scope:
- repository and unit-of-work implementation with Sequelize
- mapping between persistence models and domain entities
- query and transaction patterns in persistence adapters

Out of scope:
- global error response policies
- logging and observability policies
- full test pyramid strategy

## Core Principle

Application owns interfaces. Infrastructure owns Sequelize implementation details.

## Required Boundaries

- Do not expose Sequelize models outside infrastructure persistence adapters.
- Domain entities must not contain ORM decorators.
- Repository interfaces live in Application.
- Repository implementations live in Infrastructure.

## Repository Pattern

Define per aggregate root:
- IUserRepository interface in application ports
- SequelizeUserRepository in infrastructure persistence

Repository responsibilities:
- load aggregate state
- save aggregate state
- enforce optimistic concurrency where needed

## Mapping Strategy

Use explicit mappers:
- Sequelize model <-> persistence record
- persistence record <-> domain entity

Avoid leaking ORM shape into domain models.

## Transactions

Apply transaction per command use case:
- create UnitOfWork interface in Application
- implement SequelizeUnitOfWork in Infrastructure
- pass transaction context through repositories

## Query Strategy

For reads:
- project to read models directly
- select only required attributes
- keep read models separate from write aggregates when useful

For writes:
- load aggregate
- execute domain behavior
- persist in one transaction

## Sequelize-Specific Best Practices

1. Use sequelize-typescript models only in infrastructure folder.
2. Disable sync in production; use migrations.
3. Add indexes for frequent filters and joins.
4. Use paranoid tables only when business requires soft delete.
5. Use scopes for shared query constraints.
6. Avoid eager load explosions; keep include trees controlled.
7. Add connection pool and timeout settings via ConfigModule.

## Anti-Corruption Rules

- No raw SQL in controllers.
- No Model.update calls in application services.
- No domain rules in Sequelize hooks unless mirrored in domain model.

## Done Criteria

- Every persistence change has unit or integration coverage
- Migrations included for schema changes
- Repositories satisfy application interfaces
- Domain remains ORM-agnostic
