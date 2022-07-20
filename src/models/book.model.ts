import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    author: string;
    
    @Column()
    description: string;

    @Column('int')
    number_pages: number;
}