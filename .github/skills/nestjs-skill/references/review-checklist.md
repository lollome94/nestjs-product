# NestJS Review Checklist

## Correctness

- Controllers delegate business logic to services.
- Service methods preserve transactional and state invariants.
- DTOs match use case contracts.

## Validation and Security

- ValidationPipe or equivalent is enabled.
- Sensitive endpoints protected by guards.
- Role or policy checks are explicit.
- No secrets or tokens in source code.

## Data and Boundaries

- Entities are not leaked as API responses.
- Repository queries are scoped and indexed where needed.
- Pagination and filtering are bounded.

## Resilience

- Timeouts and retries for external calls.
- Idempotency strategy for retried operations.
- Graceful shutdown path for process termination.

## Observability

- Structured logs with request context.
- Health checks for dependencies.
- Metrics for latency and error rates.

## Testing

- Unit tests for business logic.
- Integration tests for adapters.
- E2E tests for critical flows.

## Documentation

- API docs updated (OpenAPI or GraphQL schema notes).
- Breaking changes documented.
- Migration steps provided when needed.
