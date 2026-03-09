---
name: nestjs-architecture-tests
description: Use this skill to enforce Clean Architecture dependency rules in NestJS projects with automated architecture checks.
---

# NestJS Architecture Tests Skill

## Scope

In scope:
- dependency boundary assertions
- anti-drift architecture checks in CI
- naming and folder policy checks where useful

Out of scope:
- business logic behavior testing
- persistence integration testing details

## Recommended Tooling

- dependency-cruiser
- eslint-plugin-boundaries

## Minimum Assertions

1. Domain does not import NestJS framework or infrastructure.
2. Application does not import sequelize or infrastructure implementations.
3. Presentation does not hold business logic.
4. Infrastructure depends on application ports, not controllers.

## CI Policy

- Run architecture checks before integration and e2e stages.
- Fail pipeline immediately on boundary violations.

## Definition Of Done

- Architecture rules are codified in tooling config
- Rules run in CI and local scripts
- Violations produce actionable output
