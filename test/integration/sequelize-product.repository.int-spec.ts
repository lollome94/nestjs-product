import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { Sequelize } from 'sequelize-typescript';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { Product } from '../../src/modules/product/domain/entities/product.entity';
import { Price } from '../../src/modules/product/domain/value-objects/price.value-object';
import { ProductId } from '../../src/modules/product/domain/value-objects/product-id.value-object';
import { ProductToken } from '../../src/modules/product/domain/value-objects/product-token.value-object';
import { Stock } from '../../src/modules/product/domain/value-objects/stock.value-object';
import { ProductModel } from '../../src/modules/product/infrastructure/persistence/models/product.model';
import { SequelizeProductRepository } from '../../src/modules/product/infrastructure/persistence/repositories/sequelize-product.repository';

describe('SequelizeProductRepository integration', () => {
  let container: StartedMySqlContainer;
  let sequelize: Sequelize;
  let repository: SequelizeProductRepository;

  const makeProduct = (overrides?: {
    id?: number;
    token?: string;
    name?: string;
    price?: number;
    stock?: number;
  }): Product => {
    const id = overrides?.id;

    return Product.create({
      id: id ? ProductId.fromNumber(id) : undefined,
      productToken: ProductToken.fromString(overrides?.token ?? 'tok-base'),
      name: overrides?.name ?? 'Base Product',
      price: Price.fromNumber(overrides?.price ?? 12.5),
      stock: Stock.fromNumber(overrides?.stock ?? 10),
    });
  };

  beforeAll(async () => {
    container = await new MySqlContainer('mysql:8.4')
      .withDatabase('ecommerce')
      .withUsername('test_user')
      .withUserPassword('test_password')
      .start();

    const dbPort = container.getMappedPort(3306);

    const env = {
      ...process.env,
      DB_HOST: container.getHost(),
      DB_PORT: String(dbPort),
      DB_USER: container.getUsername(),
      DB_PASSWORD: container.getUserPassword(),
      DB_NAME: container.getDatabase(),
    };

    execSync('npx sequelize-cli db:migrate --config config/config.cjs --env test', {
      cwd: resolve(__dirname, '../..'),
      stdio: 'inherit',
      env,
    });

    sequelize = new Sequelize({
      dialect: 'mysql',
      host: container.getHost(),
      port: dbPort,
      username: container.getUsername(),
      password: container.getUserPassword(),
      database: container.getDatabase(),
      models: [ProductModel],
      logging: false,
    });

    await sequelize.authenticate();
    repository = new SequelizeProductRepository(ProductModel);
  }, 120000);

  afterEach(async () => {
    if (sequelize) {
      await ProductModel.destroy({ where: {}, truncate: true });
    }
  });

  afterAll(async () => {
    if (sequelize) {
      await sequelize.close();
    }
    if (container) {
      await container.stop();
    }
  }, 120000);

  it('saves and fetches a product by id', async () => {
    const saved = await repository.save(
      makeProduct({ token: 'tok-int-1', name: 'Integration 1' }),
    );

    const fetched = await repository.findById(ProductId.fromNumber(saved.id!.toNumber()));

    expect(fetched).not.toBeNull();
    expect(fetched?.productToken.toString()).toBe('tok-int-1');
    expect(fetched?.name).toBe('Integration 1');
  });

  it('finds product by product token', async () => {
    await repository.save(makeProduct({ token: 'tok-int-2' }));

    const fetched = await repository.findByProductToken(
      ProductToken.fromString('tok-int-2'),
    );

    expect(fetched).not.toBeNull();
    expect(fetched?.productToken.toString()).toBe('tok-int-2');
  });

  it('returns paginated products', async () => {
    await repository.save(makeProduct({ token: 'tok-int-3', name: 'P1' }));
    await repository.save(makeProduct({ token: 'tok-int-4', name: 'P2' }));
    await repository.save(makeProduct({ token: 'tok-int-5', name: 'P3' }));

    const page = await repository.findPaginated(0, 2);

    expect(page.total).toBe(3);
    expect(page.items).toHaveLength(2);
    expect(page.items[0].name).toBe('P1');
    expect(page.items[1].name).toBe('P2');
  });

  it('deletes product by id', async () => {
    const saved = await repository.save(makeProduct({ token: 'tok-int-6' }));

    const deleted = await repository.deleteById(ProductId.fromNumber(saved.id!.toNumber()));
    const fetched = await repository.findById(ProductId.fromNumber(saved.id!.toNumber()));

    expect(deleted).toBe(true);
    expect(fetched).toBeNull();
  });
});
