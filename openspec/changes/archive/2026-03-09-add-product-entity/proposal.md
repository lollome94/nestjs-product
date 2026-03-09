## Why

The ecommerce system requires product management functionality. We need to introduce a Product entity in the domain layer following DDD principles, with Sequelize code-first approach to define the database schema for a MySQL `ecommerce` database.

## What Changes

- Add a new Product aggregate/entity in the domain layer
- Create Sequelize model for the `products` table with specified columns: id (auto-increment primary key), productToken (unique string), name (string), price (decimal), stock (integer)
- Implement repository pattern for data access
- Update application module to include the new domain components

## Capabilities

### New Capabilities
- `product-entity`: Define and manage Product entities in the domain with database persistence

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- Database: New `products` table in MySQL `ecommerce` database
- Domain Layer: New Product aggregate and related value objects
- Infrastructure Layer: Sequelize model and repository implementation
- Application Layer: Module updates to wire dependencies</content>
<parameter name="filePath">c:\DEV\github\nestjs-product\openspec\changes\add-product-entity\proposal.md