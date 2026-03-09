# Architecture Playbook

## Decision Matrix

Choose architecture depth based on context.

- Simple layered module
Use for small CRUD features and low-complexity domains.

- Modular monolith
Use when domain is growing and multiple teams touch the same codebase.

- CQRS or event-driven
Use for high write/read divergence, workflow orchestration, auditability.

- Hexagonal or clean architecture
Use when external adapters change often and domain longevity matters.

## Module Design Rules

- One module per business capability, not per technical layer.
- Export only required providers.
- Avoid circular dependencies. If they appear, revisit boundaries.
- Keep controllers thin; delegate to application services.

## Provider Rules

- Define interfaces for external dependencies.
- Inject concrete adapters in infrastructure modules.
- Keep domain logic framework-agnostic when possible.

## DTO and Contract Rules

- Distinguish command DTOs from response DTOs.
- Validate every input boundary.
- Do not expose persistence entities directly over API.
- Version external APIs explicitly when breaking changes are possible.

## Configuration Rules

- Centralize config loading and validation.
- Fail fast at startup on missing required env.
- Separate app config by domain (db, auth, queue, cache).

## Error Handling Rules

- Domain errors map to stable transport errors.
- Use global filters for consistency.
- Include machine-readable error code and request correlation id.

## Observability Rules

- Log structured events, not string-only logs.
- Include request or trace context in all logs.
- Expose health endpoints for app and dependencies.
- Add latency and error metrics for critical paths.
