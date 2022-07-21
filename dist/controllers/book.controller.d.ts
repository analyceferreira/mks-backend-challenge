import { Repository } from "typeorm";
import { BookModel } from "src/models/book.model";
import { BookSchema } from "src/schemas/book.schema";
export declare class BookController {
    private model;
    constructor(model: Repository<BookModel>);
    create(body: BookSchema): Promise<{
        data: BookModel;
    }>;
    getAll(): Promise<{
        data: BookModel[];
    }>;
    getOne(title: string): Promise<{
        data: BookModel;
    }>;
    update(title: string, body: BookSchema): Promise<{
        data: string;
    }>;
    delete(title: string): Promise<{
        data: string;
    }>;
}
