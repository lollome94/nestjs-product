---
name: nestjs-domain-ddd-modeling
description: Use this skill when modeling aggregates, entities, value objects, domain services, and domain events in NestJS Clean Architecture.
---

# NestJS Domain DDD Modeling Skill

## Scope

In scope:
- aggregate design and invariants
- entity lifecycle and factories
- value object validation
- domain events and side-effect boundaries

Out of scope:
- controller and HTTP contracts
- ORM mapping and Sequelize implementation
- infrastructure adapter concerns

## Modeling Rules

1. Keep domain framework-agnostic.
2. Enforce invariants in constructors or factories.
3. Prefer value objects for validated concepts.
4. Model behavior inside aggregates, not in services by default.
5. Use domain services only for cross-aggregate domain logic.

## Error Strategy Handshake

Represent domain failures with domain error types and delegate HTTP mapping to nestjs-error-logging-performance.

## Definition Of Done

- Domain objects express business language clearly
- No NestJS decorators in domain
- No Sequelize types in domain
- Domain tests cover invariants and edge cases
