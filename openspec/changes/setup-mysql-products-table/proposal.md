## Why

The product domain needs a concrete persistence baseline so the service can reliably store and retrieve catalog items in MySQL. Defining this now enables consistent schema assumptions across application, infrastructure, and testing work.

## What Changes

- Introduce a MySQL-backed product persistence baseline using database `ecommerce` and table `products`.
- Define the required `products` table structure with primary key, uniqueness, and type constraints.
- Specify the persisted product attributes: token, name, price, and stock.
- Establish migration and verification expectations so schema setup is reproducible across environments.

## Capabilities

### New Capabilities
- `product-mysql-persistence`: Define and enforce MySQL schema requirements for product records in the `ecommerce.products` table.

### Modified Capabilities
- None.

## Impact

- Affected code: infrastructure persistence layer, migration scripts, and data access configuration.
- Affected APIs: product create/read/update flows that depend on database schema readiness.
- Dependencies: MySQL driver/configuration, migration tooling, and test database setup.
- Systems: local/dev/test MySQL instances must provide the `ecommerce` database.
