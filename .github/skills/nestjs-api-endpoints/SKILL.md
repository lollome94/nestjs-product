---
name: nestjs-api-endpoints
description: Use this skill when creating or reviewing NestJS controllers, DTOs, endpoint contracts, and transport-layer mapping.
---

# NestJS API Endpoints Skill

## Scope

In scope:
- controllers and route contracts
- request and response DTO modeling
- mapping DTOs to commands or queries
- status code and response shape consistency

Out of scope:
- domain and persistence implementation details
- logging and tracing strategy design
- authentication architecture (use security skill)

## Controller Rules

1. Controllers are transport adapters only.
2. No business rules in controllers.
3. Validate inputs with pipes and DTOs.
4. Return stable response contracts.
5. Map use-case errors through centralized policy.

## DTO Rules

- Keep DTOs explicit and immutable where possible.
- Do not expose domain entities directly.
- Keep pagination and filtering parameters explicit.

## Definition Of Done

- Endpoint contract documented and consistent
- DTO validation and transformation configured
- HTTP status mapping aligned with global error policy
- E2E tests cover happy path and key error path
