---
name: nestjs-error-logging-performance
description: Use this skill for NestJS error flow design (ErrorOr-like result patterns), global exception mapping, structured logging, tracing, and performance hardening.
---

# NestJS Error, Logging, And Performance Skill

Focused guidance for resilient APIs with readable and scalable failure handling.

## Scope

In scope:
- Result/ErrorOr-like error modeling
- exception mapping and safe error responses
- structured logging, tracing, and metrics
- runtime performance safeguards

Out of scope:
- module and layer architecture design decisions
- ORM repository implementation details
- complete test strategy design

## Goals

- model business failures explicitly, not with random throw statements
- centralize exception to HTTP mapping
- produce structured and correlated logs
- add practical performance safeguards

## Error Strategy (ErrorOr Equivalent)

In NestJS, use one of these patterns:
- Result type (Ok or Err) with discriminated union
- neverthrow Result
- custom DomainError classes + mapper

Recommended split:
- Domain and Application return Result<T, DomainError>
- Presentation maps failures to HTTP problem details
- truly unexpected failures are thrown and caught by global exception filter

Domain error shape:
- code: stable machine-readable code
- message: user-safe message
- metadata: optional detail for logs only

## Exception Mapping

Use a global filter in Presentation:
- Domain validation or invariant error -> 400
- Resource not found -> 404
- Conflict or concurrency error -> 409
- Unauthorized or forbidden -> 401 or 403
- Unexpected error -> 500 with generic message

Never leak stack traces or SQL internals in response bodies.

## Logging Standards

Use structured logger such as nestjs-pino.

Required fields on every log:
- requestId or correlationId
- userId when authenticated
- module and useCase name
- latencyMs for request completion
- error code for failures

Good defaults:
- log level from env
- redact secrets and tokens
- include HTTP method, path, status, duration

## Tracing And Metrics

Recommended baseline:
- OpenTelemetry traces for HTTP and DB calls
- Prometheus metrics for request count, latency percentiles, and error rate

Golden signals:
- latency
- traffic
- errors
- saturation

## Performance Checklist

1. Add request timeout and abort support for external calls.
2. Use pagination on list endpoints.
3. Avoid N+1 queries in Sequelize includes.
4. Select only needed columns.
5. Add cache for hot read paths where consistency allows.
6. Measure before and after optimization.
7. Keep p95 and p99 latency budgets per endpoint.

## Review Heuristics

Reject changes when:
- business errors are thrown as generic Error
- controller contains business branching logic
- logs are plain strings without context
- sensitive data is logged
- performance changes have no measurable acceptance criteria
