## Context

The change establishes a reliable MySQL persistence baseline for product data. The current project does not yet define a formal schema contract for products, which creates ambiguity for implementation and testing. The target database is `ecommerce`, with product records stored in `products`.

Constraints:
- The table shape must exactly match requested columns and key properties.
- The design must stay implementation-agnostic enough to allow any migration tool chosen during apply.
- The schema must support deterministic setup in local, CI, and test environments.

## Goals / Non-Goals

**Goals:**
- Define a canonical `products` table contract in MySQL.
- Ensure `productToken` uniqueness at database level.
- Specify data types and constraints for price and stock to support common ecommerce use cases.
- Enable repeatable schema creation and verification through migrations.

**Non-Goals:**
- Building full product CRUD application logic.
- Defining indexing strategy beyond required primary and unique keys.
- Addressing multi-currency pricing models.
- Designing analytics/reporting schema.

## Decisions

1. Use a single table `ecommerce.products` as the initial persistence boundary.
- Rationale: minimal, explicit baseline for product domain with low migration risk.
- Alternative considered: splitting into separate inventory and pricing tables now. Rejected due to unnecessary early complexity.

2. Define `id` as auto-increment primary key.
- Rationale: simple and widely supported surrogate key for joins and references.
- Alternative considered: UUID primary key. Rejected for now because the requirement explicitly requests auto-increment and operational simplicity.

3. Enforce unique `productToken` as a business-stable identifier.
- Rationale: supports idempotent writes and external-safe references.
- Alternative considered: non-unique token plus composite uniqueness. Rejected because uniqueness is a direct requirement and simpler to validate.

4. Represent `price` as fixed-point decimal.
- Rationale: avoids floating-point precision errors in monetary values.
- Alternative considered: integer cents only. Rejected for now to match requested decimal field while leaving room for future currency refinement.

5. Represent `stock` as integer with non-negative expectation.
- Rationale: inventory quantity is discrete.
- Alternative considered: decimal stock to support fractional inventory. Rejected as out of scope.

## Risks / Trade-offs

- [Risk] Decimal precision/scale mismatch with application DTOs can cause rounding issues. → Mitigation: define precision/scale explicitly in migration and mirror in validation.
- [Risk] Existing environments may already have conflicting table definitions. → Mitigation: migration pre-check for table existence and clear fail-fast error.
- [Risk] Stock underflow from application bugs. → Mitigation: add non-negative check constraint where supported, and enforce in application validation.

## Migration Plan

1. Create migration to ensure database `ecommerce` exists (or document prerequisite where environment owns DB creation).
2. Create `products` table with required columns and constraints:
- `id`: auto-increment primary key
- `productToken`: unique string
- `name`: string
- `price`: decimal
- `stock`: integer
3. Apply migration in dev/test and verify schema with information-schema query.
4. Rollback strategy: drop `products` table if no production data exists; otherwise create a reversible forward migration for safe remediation.

## Open Questions

- Should `name` have a maximum length standard (for example, 255) across API and DB?
- Should `stock` enforce `>= 0` strictly at DB level in all target MySQL versions?
- Should `price` use a standard precision/scale such as `DECIMAL(10,2)` or a larger precision for future catalogs?
