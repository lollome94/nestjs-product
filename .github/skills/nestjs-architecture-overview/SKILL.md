---
name: nestjs-architecture-overview
description: Use this skill when defining, implementing, or reviewing a NestJS Clean Architecture + DDD codebase, especially when you need strict layer boundaries, CQRS flow, scalable modules, and architecture test guardrails.
---

# NestJS Architecture Overview Skill

Operating guide to run an agentic Clean Architecture in NestJS.

## Scope

In scope:
- layer boundaries and dependency rules
- DDD tactical structure (entities, value objects, aggregates, domain events)
- CQRS organization and module decomposition
- anti-drift architecture guardrails

Out of scope (handled by other skills):
- error mapping and observability implementation details
- Sequelize implementation details
- test execution strategy details

## When To Use

Use this skill when the user asks for:
- clean architecture setup or refactor in NestJS
- domain driven design structure
- scalable module boundaries
- CQRS style handlers and use cases
- architecture quality gates and anti-drift checks

## Target Architecture

Adopt these layers and dependency rules:
- Domain: entities, value objects, domain errors, domain services, domain events
- Application: use cases, command or query handlers, ports, validation policies
- Infrastructure: adapters for database, queues, external APIs, cache
- Presentation: controllers, DTO mapping, transport concerns

Dependency direction:
- Domain -> depends on nothing inside the solution
- Application -> depends only on Domain
- Infrastructure -> depends on Application and Domain
- Presentation -> depends on Application and uses Infrastructure through DI composition

## Folder Baseline

Recommended monolith layout:

```text
src/
  modules/
    {bounded-context}/
      domain/
        entities/
        value-objects/
        events/
        errors/
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

## Design Rules

1. Keep business invariants in domain model methods and factories, not controllers.
2. Use use-case handlers in Application as orchestration, never raw ORM in controllers.
3. Define ports in Application and implement them in Infrastructure.
4. Keep DTOs in Presentation only; map DTOs to command or query models.
5. Keep transactions at use-case boundary.
6. Emit domain events from aggregates; process integrations in Infrastructure.
7. Enforce consistent naming conventions and module-level cohesion.

## CQRS Mapping In NestJS

If using @nestjs/cqrs:
- Command -> write use case
- Query -> read use case
- CommandHandler or QueryHandler -> application orchestration
- EventHandler -> side effects and integration

If not using @nestjs/cqrs, keep the same split with explicit services:
- Application service per use case
- Strict read or write separation in naming and foldering

## Architecture Drift Prevention

Require quality gates:
- ESLint import boundaries to block forbidden layer imports
- Dependency Cruiser rules for path-level dependency policies
- Architecture tests asserting forbidden dependency edges

Minimum checks:
- Domain cannot import NestJS or Sequelize
- Application cannot import sequelize, sequelize-typescript, or infrastructure code
- Presentation cannot contain business rules

## Definition Of Done

- Layer boundaries and folder conventions respected
- New feature includes domain + application + infrastructure + presentation pieces
- Architecture checks pass in CI
