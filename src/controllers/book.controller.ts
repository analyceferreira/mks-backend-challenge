import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BookModel } from "src/models/book.model"
import { BookSchema } from "src/schemas/book.schema";


@Controller('/books')
export class BookController {
    constructor(
        @InjectRepository(BookModel) private model: Repository<BookModel>,
    ) {}

    @Post()
    public async create(@Body() body: BookSchema): Promise<{data: BookModel}> {
        const bookCreated = await this.model.save(body)
        return {data: bookCreated };
    }

    @Get()
    public async getAll(): Promise<{ data: BookModel[] }> {
        const bookList = await this.model.find(); 
        return {data: bookList};
    }

    @Get(':title')
    public async getOne(@Param('title', ) title:string ): Promise< {data: BookModel} > {
        const replace = /-/gi
        const titleSeach = title.replace(replace, " ")
        console.log(titleSeach)

        const book = await this.model.createQueryBuilder()
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .getOne();
        console.log(book)

        if (!book) {
            throw new NotFoundException("Livro não encontrado")
        }
        return {data: book};
    }

    @Get(':title')
    public async getBy(@Param('title', ) title:string ): Promise< {data: BookModel[]} > {
        const replace = /-/gi
        const titleSeach = title.replace(replace, " ")
        console.log(titleSeach)

        const book = await this.model.createQueryBuilder()
        .where("title like %:title% ", {title: titleSeach })
        .getMany();
        console.log(book)

        if (!book) {
            throw new NotFoundException("Livro não encontrado")
        }
        return {data: book};
    }

    @Patch(':title')
    public async update(
        @Param('title') title: string,
        @Body() body: BookSchema)
        : Promise<{data: string }> {

        const replace = /-/gi
        const titleSeach = title.replace(replace, " ")

        const book = await this.model.createQueryBuilder()
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .getOne();

        await this.model.createQueryBuilder()
        .update()
        .set({
            title: body.title,
            author: body.author,
            description: body.description,
            number_pages: body.number_pages
        })
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .execute()

        return {data: `Livro alterado com sucesso!`};
    }

    @Delete(':title')
    public async delete(@Param('title') title: string): Promise<{data: string}> {
        const replace = /-/gi
        const titleSeach = title.replace(replace, " ")

        const book = await this.model.createQueryBuilder()
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .getOne();

        if (!book) {
            throw new NotFoundException("Livro não encontrado")
        }

        await this.model.createQueryBuilder()
        .delete()
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .execute()

        return {data: `Livro ${titleSeach} foi deletado`};
    }
}