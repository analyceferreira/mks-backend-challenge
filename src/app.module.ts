import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BookModule } from './modules/book.module';


@Module({
  imports: [BookModule, TypeOrmModule.forRoot({
    "database": "db.sql",
    "type": "sqlite",
    "entities": ["dist/**/*.model{.js, .ts}"],
  })],
  controllers: [AppController],
})

export class AppModule {}
