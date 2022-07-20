"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_model_1 = require("../models/book.model");
const book_schema_1 = require("../schemas/book.schema");
let BookController = class BookController {
    constructor(model) {
        this.model = model;
    }
    async create(body) {
        const bookCreated = await this.model.save(body);
        return { data: bookCreated };
    }
    async getAll() {
        const bookList = await this.model.find();
        return { data: bookList };
    }
    async getOne(title) {
        const replace = /-/gi;
        const titleSeach = title.replace(replace, " ");
        console.log(titleSeach);
        const book = await this.model.createQueryBuilder()
            .where("LOWER(title) = LOWER(:title)", { title: titleSeach })
            .getOne();
        console.log(book);
        if (!book) {
            throw new common_1.NotFoundException("Livro não encontrado");
        }
        return { data: book };
    }
    async getBy(title) {
        const replace = /-/gi;
        const titleSeach = title.replace(replace, " ");
        console.log(titleSeach);
        const book = await this.model.createQueryBuilder()
            .where("title like %:title% ", { title: titleSeach })
            .getMany();
        console.log(book);
        if (!book) {
            throw new common_1.NotFoundException("Livro não encontrado");
        }
        return { data: book };
    }
    async update(title, body) {
        const replace = /-/gi;
        const titleSeach = title.replace(replace, " ");
        const book = await this.model.createQueryBuilder()
            .where("LOWER(title) = LOWER(:title)", { title: titleSeach })
            .getOne();
        await this.model.createQueryBuilder()
            .update()
            .set({
            title: body.title,
            author: body.author,
            description: body.description,
            number_pages: body.number_pages
        })
            .where("LOWER(title) = LOWER(:title)", { title: titleSeach })
            .execute();
        return { data: `Livro alterado com sucesso!` };
    }
    async delete(title) {
        const replace = /-/gi;
        const titleSeach = title.replace(replace, " ");
        const book = await this.model.createQueryBuilder()
            .where("LOWER(title) = LOWER(:title)", { title: titleSeach })
            .getOne();
        if (!book) {
            throw new common_1.NotFoundException("Livro não encontrado");
        }
        await this.model.createQueryBuilder()
            .delete()
            .where("LOWER(title) = LOWER(:title)", { title: titleSeach })
            .execute();
        return { data: `Livro ${titleSeach} foi deletado` };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_schema_1.BookSchema]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(':title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBy", null);
__decorate([
    (0, common_1.Patch)(':title'),
    __param(0, (0, common_1.Param)('title')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_schema_1.BookSchema]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "delete", null);
BookController = __decorate([
    (0, common_1.Controller)('/books'),
    __param(0, (0, typeorm_1.InjectRepository)(book_model_1.BookModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map