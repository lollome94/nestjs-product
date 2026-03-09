# Feature Module Template

Use this blueprint to scaffold a new capability module.

## Suggested Folder Shape

src/<feature>/
- <feature>.module.ts
- application/
  - use-cases/
  - dto/
  - ports/
- domain/
  - entities/
  - services/
  - errors/
- infrastructure/
  - repositories/
  - mappers/
  - adapters/
- presentation/
  - http/
    - <feature>.controller.ts

## Controller Skeleton

```ts
@Controller('features')
export class FeatureController {
  constructor(private readonly createFeature: CreateFeatureUseCase) {}

  @Post()
  async create(@Body() dto: CreateFeatureDto): Promise<FeatureResponseDto> {
    return this.createFeature.execute(dto);
  }
}
```

## Application Service Skeleton

```ts
@Injectable()
export class CreateFeatureUseCase {
  constructor(
    @Inject(FEATURE_REPOSITORY)
    private readonly repository: FeatureRepository,
  ) {}

  async execute(input: CreateFeatureDto): Promise<FeatureResponseDto> {
    const entity = FeatureEntity.create(input);
    const saved = await this.repository.save(entity);
    return FeatureResponseDto.fromEntity(saved);
  }
}
```

## Definition of Done

- Input DTO validated.
- Domain invariant tests added.
- Integration test for repository behavior added.
- API docs updated.
