import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    author: string;
    
    @Column('int')
    description: string;

    @Column()
    number_pages: number;
}