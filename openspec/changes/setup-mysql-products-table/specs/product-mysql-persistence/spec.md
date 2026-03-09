## ADDED Requirements

### Requirement: MySQL products table schema is defined
The system MUST define a MySQL table `ecommerce.products` with the following columns: `id`, `productToken`, `name`, `price`, and `stock`.

#### Scenario: Table contains required columns
- **WHEN** the schema migration for product persistence is applied
- **THEN** the `ecommerce.products` table exists with columns `id`, `productToken`, `name`, `price`, and `stock`

### Requirement: Product primary key is auto-incrementing
The system MUST configure `products.id` as an auto-incrementing primary key.

#### Scenario: Primary key behavior is enforced
- **WHEN** a new product row is inserted without explicitly setting `id`
- **THEN** MySQL assigns a new numeric `id` value and enforces primary key uniqueness

### Requirement: Product token uniqueness is enforced
The system MUST enforce uniqueness of `products.productToken` at the database level.

#### Scenario: Duplicate token insert is rejected
- **WHEN** an insert is attempted with a `productToken` value that already exists
- **THEN** the database rejects the operation with a uniqueness violation

### Requirement: Price is stored as decimal
The system MUST store `products.price` using a decimal data type suitable for monetary values.

#### Scenario: Price retains exact decimal representation
- **WHEN** a product is stored with a decimal price value
- **THEN** the persisted value is represented as fixed-point decimal rather than floating-point

### Requirement: Stock is stored as integer
The system MUST store `products.stock` using an integer data type.

#### Scenario: Stock is persisted as whole-number quantity
- **WHEN** a product is stored with stock quantity
- **THEN** the persisted stock value is treated as an integer quantity
