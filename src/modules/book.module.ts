import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookController } from "../controllers/book.controller";
import { BookModel } from "../models/book.model";

@Module({
    imports: [TypeOrmModule.forFeature([BookModel])],
    controllers: [BookController],
})
export class BookModule {}