## ADDED Requirements

### Requirement: Create Product Endpoint
The system SHALL provide a POST endpoint at `/products` that accepts product details (name, productToken, price, stock) in the request body and creates a new product in the database.

#### Scenario: Successful product creation
- **WHEN** a POST request is made to `/products` with valid product data (name: string, productToken: string, price: number, stock: number)
- **THEN** the system SHALL create the product in the database and return HTTP 201 with the created product data including generated ID

#### Scenario: Product creation with invalid data
- **WHEN** a POST request is made to `/products` with invalid data (missing required fields or invalid types)
- **THEN** the system SHALL return HTTP 400 with validation error details

### Requirement: Read Products Endpoint with Pagination
The system SHALL provide a GET endpoint at `/products` that retrieves a paginated list of all products from the database, supporting query parameters `page` (default 1) and `limit` (default 10).

#### Scenario: Retrieve products with default pagination
- **WHEN** a GET request is made to `/products` without query parameters
- **THEN** the system SHALL return HTTP 200 with the first 10 products and pagination metadata (total count, current page, total pages)

#### Scenario: Retrieve products with custom pagination
- **WHEN** a GET request is made to `/products?page=2&limit=5`
- **THEN** the system SHALL return HTTP 200 with products 6-10 and appropriate pagination metadata

### Requirement: Get Specific Product Endpoint
The system SHALL provide a GET endpoint at `/products/:id` that retrieves a specific product by its ID.

#### Scenario: Retrieve existing product
- **WHEN** a GET request is made to `/products/{valid-id}`
- **THEN** the system SHALL return HTTP 200 with the product data

#### Scenario: Retrieve non-existing product
- **WHEN** a GET request is made to `/products/{invalid-id}`
- **THEN** the system SHALL return HTTP 404 with error message

### Requirement: Update Product Stock Endpoint
The system SHALL provide a PUT endpoint at `/products/:id/stock` that updates the stock quantity of a specific product, accepting `stock` in the request body.

#### Scenario: Update stock of existing product
- **WHEN** a PUT request is made to `/products/{valid-id}/stock` with valid stock number
- **THEN** the system SHALL update the product stock and return HTTP 200 with updated product data

#### Scenario: Update stock of non-existing product
- **WHEN** a PUT request is made to `/products/{invalid-id}/stock` with stock number
- **THEN** the system SHALL return HTTP 404 with error message

### Requirement: Delete Product Endpoint
The system SHALL provide a DELETE endpoint at `/products/:id` that deletes a specific product from the database.

#### Scenario: Delete existing product
- **WHEN** a DELETE request is made to `/products/{valid-id}`
- **THEN** the system SHALL delete the product and return HTTP 204

#### Scenario: Delete non-existing product
- **WHEN** a DELETE request is made to `/products/{invalid-id}`
- **THEN** the system SHALL return HTTP 404 with error message