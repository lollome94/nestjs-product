## Context

The application is a NestJS project with Clean Architecture, using Sequelize for database interactions with MySQL. There's an existing product module with domain entities, repositories, and persistence layer already implemented. This change adds the API layer (controllers and services) to expose CRUD operations for products via REST endpoints.

## Goals / Non-Goals

**Goals:**
- Implement REST API endpoints for product CRUD operations
- Support pagination for listing products
- Use existing domain and persistence layers
- Create HTTP test file for endpoint validation
- Follow NestJS best practices and Clean Architecture principles

**Non-Goals:**
- Modify existing domain entities or value objects
- Change database schema or migrations
- Implement authentication/authorization
- Add GraphQL or other transport layers

## Decisions

- **Controller Structure**: Create `ProductController` in the product module with standard REST endpoints
- **Service Layer**: Add `ProductService` to handle business logic and orchestrate repository calls
- **DTOs**: Create request/response DTOs for API contracts (CreateProductDto, UpdateStockDto, ProductResponseDto, PaginatedProductsDto)
- **Pagination**: Implement manual pagination using query parameters `page` and `limit` with metadata
- **Error Handling**: Use NestJS built-in exception handling with appropriate HTTP status codes
- **Validation**: Use class-validator for request validation
- **HTTP Test File**: Create `products.http` file with requests for all endpoints

## Risks / Trade-offs

- **Risk**: Manual pagination implementation may be less efficient than library solutions → Mitigation: Keep simple for now, can optimize later if needed
- **Risk**: Adding service layer might duplicate logic if domain services exist → Mitigation: Use service for API-specific logic, delegate to repositories
- **Risk**: Validation errors may not be user-friendly → Mitigation: Use proper error messages in DTOs