# Testing Template

## Unit Test Skeleton

```ts
describe('CreateFeatureUseCase', () => {
  it('creates entity when input is valid', async () => {
    // arrange
    // act
    // assert
  });

  it('throws domain error on invalid invariant', async () => {
    // arrange
    // act
    // assert
  });
});
```

## Integration Test Skeleton

```ts
describe('FeatureRepository (integration)', () => {
  it('persists and retrieves entity', async () => {
    // bootstrap test module + db
    // verify persistence behavior
  });
});
```

## E2E Test Skeleton

```ts
describe('Feature API (e2e)', () => {
  it('POST /features returns 201 on valid payload', async () => {
    // app bootstrap
    // supertest request
    // response assertions
  });

  it('POST /features returns 400 on invalid payload', async () => {
    // validation failure path
  });
});
```

## Coverage Focus

- primary business rules
- validation failures
- authorization failures
- transport error mapping
