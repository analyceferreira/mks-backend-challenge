import { IsInt, IsString, MaxLength, Min } from 'class-validator'
import { Index } from 'typeorm';


export class BookSchema {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @Index({fulltext: true})
    @MaxLength(255)
    author: string;

    @IsString()
    description: string;

    @IsInt()
    @Min(1)
    number_pages: number;
}

