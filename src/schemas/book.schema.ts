import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, Min } from 'class-validator'
import { Index } from 'typeorm';


export class BookSchema {
    @IsString()
    @MaxLength(255)
    @ApiProperty()
    title: string;

    @IsString()
    @Index({fulltext: true})
    @MaxLength(255)
    @ApiProperty()
    author: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsInt()
    @Min(1)
    @ApiProperty()
    number_pages: number;
}

