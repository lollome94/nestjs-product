---
name: nestjs-cqrs-handlers
description: Use this skill when implementing commands, queries, handlers, validators, and application ports in a NestJS CQRS flow.
---

# NestJS CQRS Handlers Skill

## Scope

In scope:
- command and query contracts
- handler orchestration
- validation flow at use-case boundary
- application port interfaces

Out of scope:
- domain entity design details
- persistence implementation details
- API controller specifics

## Handler Rules

1. Keep handlers thin and orchestration-only.
2. Put business invariants in domain, not in handler branches.
3. Inject ports, not infrastructure implementations.
4. Use explicit input and output types.
5. Keep write and read paths separated.

## Folder Convention

```text
application/
  commands/{feature}/
  queries/{feature}/
  ports/
```

## Definition Of Done

- Command or query has clear intent and name
- Handler depends only on domain and application ports
- Validation exists for input-bearing commands
- Unit tests cover success, expected failures, and boundary cases
