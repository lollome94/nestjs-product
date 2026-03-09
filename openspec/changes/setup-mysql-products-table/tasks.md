## 1. Schema Baseline

- [ ] 1.1 Add migration/config step that ensures access to MySQL database `ecommerce` for this service environment.
- [ ] 1.2 Create the `products` table migration with columns `id`, `productToken`, `name`, `price`, and `stock`.
- [ ] 1.3 Configure `id` as auto-increment primary key in the migration.
- [ ] 1.4 Add database-level unique constraint/index for `productToken`.

## 2. Type and Constraint Details

- [ ] 2.1 Set `name` to a string/varchar type consistent with project conventions.
- [ ] 2.2 Set `price` to an explicit decimal type appropriate for monetary values.
- [ ] 2.3 Set `stock` to an integer type and align validation for whole-number inventory.
- [ ] 2.4 Add non-negative stock constraint where supported, or document fallback enforcement strategy.

## 3. Verification and Safety

- [ ] 3.1 Add schema verification query/check to confirm table, columns, primary key, and unique constraint after migration.
- [ ] 3.2 Add or update integration test setup to apply migrations against MySQL and validate resulting schema contract.
- [ ] 3.3 Define rollback/remediation steps for failed or conflicting schema deployments.

## 4. Documentation and Handoff

- [ ] 4.1 Document required environment assumptions for MySQL `ecommerce` database provisioning.
- [ ] 4.2 Document the `products` schema contract and expected field semantics for application teams.
- [ ] 4.3 Link migration, verification, and test commands in project docs for repeatable execution.
