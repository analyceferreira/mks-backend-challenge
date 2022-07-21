import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Redirect, Res } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BookModel } from "src/models/book.model"
import { BookSchema } from "src/schemas/book.schema";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { getOneSwagger } from "src/swagger/getOne.swagger";
import { getAllSwagger } from "src/swagger/getAll.swagger";
import { createSwagger } from "src/swagger/create.swagger";
import { updateSwagger } from "src/swagger/update.swagger";
import { deleteSwagger } from "src/swagger/delete.swagger";




const processEntryInformation = (info:string) => {
        const replace = /-/gi
        return info.replace(replace, " ");
}

const takeOneBookByTitle =async (title:string, model:Repository<BookModel>) => {
    return await model.createQueryBuilder()
                     .where("LOWER(title) = LOWER(:title)", {title: title})
                     .getOne();
}

const verifyBookIsFind = (book) => {
    if (!book) {
        throw new NotFoundException("Livro não encontrado");
    }
}





@Controller('/books')
@ApiTags('Books Catalog MKS Challeng')
export class BookController {
    constructor(
        @InjectRepository(BookModel) private model: Repository<BookModel>,
    ) {}


    @Post()
    @ApiOperation({ 
        summary:'Creat new book'
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Book created successful',
        type: createSwagger,
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Invalid parameters'
    })

    public async create(@Body() body: BookSchema): Promise<{data: BookModel}> {
        const bookCreated = await this.model.save(body)
        return {data: bookCreated };
    }


    @Get()
    @ApiOperation({ 
        summary:'Get all books from the catalog'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Return list of books successful',
        type: getAllSwagger,
    })
    public async getAll(): Promise<{ data: BookModel[] }> {
        const bookList = await this.model.find(); 
        return {data: bookList};
    }


    @Get(':title')
    @ApiOperation({ 
        summary:'Get a specific books from the catalog'
    })
    @ApiParam({
        name: "title",
        description: `Send the book title in the request parameter separated by "-"`,
        allowEmptyValue: false,
        examples: {
            a: {
                summary: "https://book-catalog-challenge.herokuapp.com/api/books/sol-do-amanha",
                value: "Book Sol do Amanhã",
                description: `{
                    "id": 1, 
                    "title": "Sol do Amanhã", 
                    "author": "anonymous", 
                    "description": "Any description here", 
                    "number_pages": 20
                  }`
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Book return successful',
        type: getOneSwagger,
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Book not find'
    })
    public async getOne(@Param('title', ) title:string ): Promise< {data: BookModel} > {
        
        const titleSeach = processEntryInformation(title);
        const book =await takeOneBookByTitle(titleSeach, this.model);

        await verifyBookIsFind(book);

        return {data: book};
    }


    @Patch(':title')
    @ApiOperation({ 
        summary:'Change a books from the catalog'
    })
    @ApiParam({
        name: "title",
        description: `Send the book title in the request parameter separated by "-"`,
        allowEmptyValue: false,
        examples: {
            a: {
                summary: "https://book-catalog-challenge.herokuapp.com/api/books/sol-do-amanha",
                value: "Book Sol do Amanhã",
                description: `{
                    "id": 1, 
                    "title": "Sol do Amanhã", 
                    "author": "anonymous", 
                    "description": "Any description here", 
                    "number_pages": 20
                  }`
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Book update successful',
        type: updateSwagger,
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Book not find'
    })
    public async update(
        @Param('title') title: string, @Body() body: BookSchema): Promise <{data: string }> {

        const titleSeach:string = processEntryInformation(title)
        const book =await takeOneBookByTitle(titleSeach, this.model)

        await this.model.createQueryBuilder()
        .update(book)
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
    @ApiOperation({ 
        summary:'Delete a books from the catalog'
    })
    @ApiParam({
        name: "title",
        description: `Send the book title in the request parameter separated by "-"`,
        allowEmptyValue: false,
        examples: {
            a: {
                summary: "https://book-catalog-challenge.herokuapp.com/api/books/sol-do-amanha",
                value: "Book Sol do Amanhã",
                description: `{"message": "Book delete successful", "book":{
                    "id": 1, 
                    "title": "Sol do Amanhã", 
                    "author": "anonymous", 
                    "description": "Any description here", 
                    "number_pages": 20
                  }}`
            }
        }
    })
    @ApiResponse({ 
        status: 204, 
        description: 'Book delete successful',
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Book not find'
    })
    public async delete(@Param('title') title: string): Promise<{data: string}> {

        const titleSeach = processEntryInformation(title)
        const book =await takeOneBookByTitle(titleSeach, this.model)

        verifyBookIsFind(book)

        await this.model.createQueryBuilder()
        .delete()
        .where("LOWER(title) = LOWER(:title)", {title: titleSeach})
        .execute()

        return {data: `Livro ${titleSeach} foi deletado`};
    }
}