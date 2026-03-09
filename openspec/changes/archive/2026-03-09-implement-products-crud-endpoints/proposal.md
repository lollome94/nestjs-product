## Why

The application needs API endpoints to manage products in the database, enabling CRUD operations for product management. This change implements the necessary endpoints in the existing NestJS product module to support creating, reading, updating, and deleting products, with pagination for listing products.

## What Changes

- Add REST API endpoints to the product module for:
  - Creating a new product (POST)
  - Retrieving all products with pagination (GET)
  - Retrieving a specific product by ID (GET)
  - Updating product stock quantity (PUT/PATCH)
  - Deleting a product (DELETE)
- Ensure endpoints use Sequelize for database interactions with MySQL
- Create HTTP file for testing the endpoints

## Capabilities

### New Capabilities
- `products-crud-endpoints`: REST API endpoints for product CRUD operations including pagination support

### Modified Capabilities
<!-- No existing capabilities are being modified at the spec level -->

## Impact

- Extends the existing product module with new controller and service methods
- Adds new routes to the application
- Requires database migration if not already present (products table)
- Creates test HTTP file for endpoint validation