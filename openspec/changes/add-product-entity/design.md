## Context

The ecommerce system is built using NestJS with Clean Architecture and DDD principles. We need to add a Product entity as an aggregate root in the domain layer, with persistence handled through Sequelize ORM using code-first approach. The database is MySQL named 'ecommerce', and we need to create a 'products' table with specific columns.

Current state: The system has basic NestJS structure with modules, but no product-related domain entities yet.

## Goals / Non-Goals

**Goals:**
- Define Product aggregate with proper DDD structure
- Implement Sequelize model for products table with required columns
- Create repository interface and implementation for data access
- Follow Clean Architecture layers (domain, application, infrastructure)

**Non-Goals:**
- Implement full CRUD API endpoints
- Add business logic beyond basic entity definition
- Handle product variants or complex relationships
- Implement caching or advanced persistence features

## Decisions

- **DDD Aggregate Pattern**: Product will be an aggregate root with ProductId as value object for the ID, following DDD principles.
- **Sequelize Code-First**: Use Sequelize decorators and models to define the database schema, allowing migrations to be generated from code.
- **Repository Pattern**: Implement repository interface in domain layer and concrete implementation in infrastructure layer.
- **Value Objects**: Use value objects for ProductToken, Price, and Stock to encapsulate business rules.
- **Database Schema**: MySQL with products table having id (auto-increment PK), productToken (unique), name, price (decimal), stock (integer).

## Risks / Trade-offs

- **Database Migration Complexity**: Code-first approach requires careful migration management → Mitigation: Use Sequelize CLI for migrations and test thoroughly.
- **Performance**: Additional layers (repository, value objects) may add overhead → Mitigation: Keep domain logic lightweight, optimize queries as needed.
- **Schema Changes**: Adding unique constraint on productToken may conflict with existing data → Mitigation: Validate uniqueness in application layer before persistence.</content>
<parameter name="filePath">c:\DEV\github\nestjs-product\openspec\changes\add-product-entity\design.md