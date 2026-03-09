## ADDED Requirements

### Requirement: Product Entity Structure
The system SHALL define a Product aggregate root with the following attributes:
- id: unique identifier (auto-increment primary key)
- productToken: unique string identifier for the product
- name: string representing the product name
- price: decimal value representing the product price
- stock: integer representing the available stock quantity

#### Scenario: Product entity creation
- **WHEN** a new Product is instantiated
- **THEN** it SHALL have all required attributes initialized
- **AND** the id SHALL be auto-generated
- **AND** productToken SHALL be unique across all products

### Requirement: Database Schema
The system SHALL create a 'products' table in the MySQL 'ecommerce' database with the following columns:
- id: INT AUTO_INCREMENT PRIMARY KEY
- productToken: VARCHAR(255) UNIQUE NOT NULL
- name: VARCHAR(255) NOT NULL
- price: DECIMAL(10,2) NOT NULL
- stock: INT NOT NULL

#### Scenario: Table creation
- **WHEN** the application starts with Sequelize code-first
- **THEN** the products table SHALL be created with the specified schema
- **AND** appropriate indexes SHALL be created for the unique constraint on productToken

### Requirement: Repository Interface
The system SHALL provide a ProductRepository interface in the domain layer with methods for:
- Saving a Product entity
- Finding a Product by id
- Finding a Product by productToken
- Retrieving all Products

#### Scenario: Repository operations
- **WHEN** a Product is saved through the repository
- **THEN** it SHALL be persisted to the database
- **AND** return the saved Product with generated id

#### Scenario: Finding by productToken
- **WHEN** a Product is retrieved by productToken
- **THEN** it SHALL return the matching Product if exists
- **OR** indicate no Product found if not exists</content>
<parameter name="filePath">c:\DEV\github\nestjs-product\openspec\changes\add-product-entity\specs\product-entity\spec.md