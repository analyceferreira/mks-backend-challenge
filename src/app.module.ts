import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book.module';


@Module({
  imports: [BookModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
