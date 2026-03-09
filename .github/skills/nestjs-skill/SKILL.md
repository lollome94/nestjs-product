---
name: nestjs-skill
description: Use this skill whenever the user asks to design, implement, review, refactor, scale, secure, test, or productionize a NestJS backend (REST, GraphQL, microservices, monolith, BFF, or monorepo). Apply opinionated best practices from official NestJS resources and the awesome-nestjs ecosystem, then deliver production-grade code and guidance with clear tradeoffs.
---

# NestJS Skill

Opinionated operating guide for building high-quality NestJS applications.

## Goal

Produce robust NestJS solutions with:
- clear architecture boundaries
- strong validation and error handling
- secure-by-default endpoints
- testable modules and adapters
- operational readiness (logging, health, observability)

## Activation Heuristics

Use this skill when the task includes one or more of:
- NestJS project setup, module design, feature development
- API contracts (REST, GraphQL, AsyncAPI)
- authentication, authorization, RBAC, multi-tenant concerns
- background jobs, queues, schedules, microservices
- performance, reliability, observability, deployment hardening
- unit, integration, e2e, contract testing

## Non-Goals

Do not apply advanced architecture patterns if user asked for a minimal prototype only. In that case keep the same safety rules but reduce abstraction layers.

## Core Rules

1. Keep framework at edges, business logic in application/domain services.
2. Every inbound request must be validated.
3. Never leak raw errors; map to stable HTTP or transport errors.
4. Prefer explicit DTOs and typed contracts over implicit any-based payloads.
5. Keep modules small and cohesive; avoid God modules.
6. Use dependency inversion for external systems (db, queue, email, cache).
7. Add tests with every non-trivial behavior change.
8. Enforce consistent logging with request or correlation context.
9. Handle shutdown and health checks for production services.
10. Document public APIs (OpenAPI, GraphQL schema notes, AsyncAPI when relevant).

## Workflow

1. Classify the request type:
- feature
- bug fix
- refactor
- architecture
- review
- performance
- security
- testing

2. Select an architecture depth from references in references/architecture-playbook.md:
- simple layered module
- modular monolith
- CQRS or event-driven
- hexagonal or clean architecture

3. Apply baseline technical guardrails:
- ValidationPipe with whitelist and transform
- global exception filter strategy
- auth and authorization guards where needed
- centralized configuration and secrets policy
- logging, healthcheck, graceful shutdown

4. Generate implementation plan and artifacts:
- module boundaries
- DTOs and contracts
- service interfaces and adapters
- test matrix (unit or integration or e2e)

5. Deliver code with templates from templates/ and adapt to existing style.

6. Self-review using references/review-checklist.md before final output.

## Output Contract

Always include:
- architecture decision summary (2-5 bullets)
- concrete implementation (code or patch)
- testing strategy and commands
- risks and tradeoffs
- follow-up options

## Tool and Library Selection Rules

Prefer official packages first, then mature ecosystem libraries.

Examples from awesome-nestjs and official docs:
- API docs: @nestjs/swagger
- CQRS: @nestjs/cqrs
- Rate limiting: @nestjs/throttler
- Health checks: @nestjs/terminus
- Scheduling: @nestjs/schedule
- Logging: nestjs-pino or nest-winston
- OpenTelemetry: nestjs-otel or @metinseylan/nestjs-opentelemetry
- Validation alternatives: nestjs-zod, typia or nestia in performance-critical contexts

If selecting a non-official package, briefly justify:
- why official package is insufficient for this use case
- maintenance and ecosystem maturity
- migration risk

## Security Defaults

Always check:
- authn and authz boundaries (guards + decorators)
- rate limiting on sensitive endpoints
- input validation and output filtering
- secrets from env or secret manager, never hardcoded
- least privilege for data access
- safe error messages and sanitized logs

## Testing Rules

Minimum for non-trivial features:
- unit tests for pure business logic
- integration tests for repository or adapter boundaries
- e2e tests for critical request flows

For contract-heavy systems, consider pact-style tests.

Use references/testing-strategy.md for depth and examples.

## Anti-Patterns to Avoid

- Fat controllers with business logic
- Direct ORM usage spread across controllers
- Runtime configuration reads scattered in code
- Silent catch blocks or swallowed exceptions
- No timeout or retry policy for external I/O
- No graceful shutdown handling in worker or microservice apps

## References

Read as needed:
- references/architecture-playbook.md
- references/testing-strategy.md
- references/review-checklist.md
- references/awesome-nestjs-curated-links.md

## Templates

Use and adapt:
- templates/feature-module-template.md
- templates/exception-filter-template.md
- templates/testing-template.md
- templates/pr-review-template.md

## Prompt Examples

Example 1:
User: "Aggiungi autenticazione JWT + RBAC e audit logging in una API NestJS"
Skill behavior:
- define auth module boundaries
- add guards and roles decorator strategy
- propose logger context and audit event model
- include e2e auth flow tests

Example 2:
User: "Rendi questo modulo più performante"
Skill behavior:
- identify bottleneck type (db, serialization, network, compute)
- apply measurable optimizations only
- add benchmark or before/after metrics checklist

Example 3:
User: "Review di una PR NestJS"
Skill behavior:
- prioritize correctness and regressions
- check validation, security, tests, observability
- report findings by severity with actionable fixes
