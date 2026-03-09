---
name: nestjs-observability-ops
description: Use this skill when designing runtime observability and operational readiness in NestJS, including logs, metrics, traces, health, and shutdown behavior.
---

# NestJS Observability And Ops Skill

## Scope

In scope:
- structured logging fields and conventions
- metrics and tracing baseline
- health endpoints and readiness checks
- graceful shutdown behavior

Out of scope:
- detailed business error taxonomy
- domain and repository design

## Operational Baseline

1. Include requestId correlation in logs.
2. Emit latency and error metrics per endpoint.
3. Instrument HTTP and DB spans.
4. Add liveness and readiness checks.
5. Support graceful shutdown for in-flight requests.

## Definition Of Done

- Logs are structured and queryable
- Metrics and traces are available for critical flows
- Health checks reflect dependency readiness
- Shutdown sequence is tested in non-happy path
