import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book.module';


@Module({
  imports: [BookModule, TypeOrmModule.forRoot({
    "database": "db.sql",
    "type": "sqlite",
    "synchronize": true,
    "entities": ["dist/**/*.model{.js, .ts}"]
  })],
})
export class AppModule {}
