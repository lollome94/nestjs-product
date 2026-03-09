---
name: nestjs-security-authz
description: Use this skill when implementing or reviewing authentication, authorization, RBAC, and endpoint security hardening in NestJS.
---

# NestJS Security And Authorization Skill

## Scope

In scope:
- authentication flow design
- authorization guards and role checks
- endpoint hardening and abuse controls
- secure secret and token handling

Out of scope:
- domain model and aggregate design
- ORM persistence patterns

## Security Baseline

1. Protect private endpoints with guards.
2. Enforce role or policy checks at handler boundary.
3. Apply throttling on sensitive routes.
4. Keep secrets in env or secret manager.
5. Never return sensitive internals in error responses.

## Review Checklist

- AuthN and AuthZ are both present where required
- Public vs private routes are explicit
- Token expiry and rotation policy is clear
- Security tests include forbidden and unauthorized cases
