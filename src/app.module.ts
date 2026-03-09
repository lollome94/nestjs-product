import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './modules/product/infrastructure/persistence/models/product.model';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'ecommerce',
      models: [ProductModel],
      autoLoadModels: false,
      synchronize: false,
      logging: false,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}