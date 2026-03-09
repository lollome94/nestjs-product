---
name: nestjs-skill
description: Use this skill whenever the user asks to design, implement, review, refactor, scale, secure, test, or productionize a NestJS backend (REST, GraphQL, microservices, monolith, BFF, or monorepo). Apply opinionated best practices from official NestJS resources and the awesome-nestjs ecosystem, then deliver production-grade code and guidance with clear tradeoffs.
---

# NestJS Skill

High-level orchestrator for NestJS work.

This skill is intentionally lightweight and delegates deep guidance to specialized skills.

## Goal

Classify the user request and activate the right specialized skill set with minimal overlap.

## Activation Heuristics

Use this skill first for any generic NestJS request, then route to specific skills below.

## Skill Routing Matrix

- Domain modeling and DDD tactical patterns:
	- .github/skills/nestjs-domain-ddd-modeling/SKILL.md
- Commands, queries, handlers, and application ports:
	- .github/skills/nestjs-cqrs-handlers/SKILL.md
- Controllers, DTOs, and transport mapping:
	- .github/skills/nestjs-api-endpoints/SKILL.md
- Clean Architecture, DDD, CQRS boundaries:
	- .github/skills/nestjs-architecture-overview/SKILL.md
- Automated architecture anti-drift checks:
	- .github/skills/nestjs-architecture-tests/SKILL.md
- ErrorOr-like flow, exception mapping, logging, tracing, performance:
	- .github/skills/nestjs-error-logging-performance/SKILL.md
- Sequelize persistence design, repository mapping, unit of work:
	- .github/skills/nestjs-sequelize-persistence/SKILL.md
- Authentication, authorization, and endpoint security:
	- .github/skills/nestjs-security-authz/SKILL.md
- Runtime observability and operational readiness:
	- .github/skills/nestjs-observability-ops/SKILL.md
- Test strategy, Testcontainers integration, anti-flaky rules:
	- .github/skills/nestjs-testing-testcontainers/SKILL.md

## Operating Workflow

1. Classify request type: feature, bug, refactor, review, architecture, testing.
2. Load one primary specialized skill and optional secondary skill.
3. Keep output scoped to user ask; avoid importing full playbooks when unnecessary.
4. For cross-cutting features, compose skills in this order:
	 - architecture -> domain -> cqrs -> persistence -> api -> error/logging/performance -> testing

## Composition Rules

- Avoid duplicating rule text from specialized skills in responses.
- Summarize shared principles once, then link to the active skill sections.
- If two skills conflict, prioritize architecture boundaries first.

## Non-Goals

- Do not duplicate full checklists from specialized skills.
- Do not prescribe advanced architecture when user asked for a minimal prototype.

## Output Contract

- Active skills selected and why
- Focused implementation or review output
- Tests or validation steps executed or proposed
- Risks and tradeoffs

## References

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
- references/architecture-playbook.md
- references/testing-strategy.md
- references/review-checklist.md
- references/awesome-nestjs-curated-links.md

