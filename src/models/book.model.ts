import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookModel {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;
    
    @Column()
    @ApiProperty()
    author: string;
    
    @Column()
    @ApiProperty()
    description: string;

    @Column('int')
    @ApiProperty()
    number_pages: number;
}