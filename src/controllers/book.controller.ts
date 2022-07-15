import { Controller, Delete, Get, Patch, Post } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BookModel } from "src/models/book.model"


@Controller('/books')
export class BookController {
    constructor(
        @InjectRepository(BookModel) private model: Repository<BookModel>,
    ) {}

    @Post()
    public create(): any {
        return {data: 'Create !!'};
    }

    @Get()
    public async getAll(): Promise<{ data: BookModel[] }> {
        const list = await this.model.find(); 
        return {data: list};
    }

    @Get(':id')
    public getOne(): any {
        return {data: 'Get One !!'};
    }

    @Patch(':id')
    public update(): any {
        return {data: 'Update !!'};
    }

    @Delete(':id')
    public delete(): any {
        return {data: 'Delete !!'};
    }
}