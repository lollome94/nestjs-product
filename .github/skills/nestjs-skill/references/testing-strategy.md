# Testing Strategy

## Pyramid for NestJS

- Unit tests
Target pure services, domain rules, and transformation logic.

- Integration tests
Target repositories, cache, queue, and external adapter integration points.

- E2E tests
Target high-value user journeys and critical security flows.

## Minimum Matrix per Feature

- Happy path request flow
- Validation failure path
- Authorization failure path
- Error mapping path

## NestJS-Specific Guidance

- Build isolated TestingModule for unit tests.
- Mock external providers through injection tokens.
- For integration tests, use disposable db or test containers when practical.
- For e2e tests, bootstrap the real app module with test config.

## Suggested Utilities from Ecosystem

- @golevelup/ts-jest or @golevelup/ts-vitest
- mockingbird for typed fixtures
- nestjs-pact when contract testing is needed
- testing-nestjs examples repository for patterns across transports

## Quality Gate

A feature is production-ready when:
- critical paths covered by tests
- failure modes tested
- test data setup is deterministic
- CI executes test suites reliably
