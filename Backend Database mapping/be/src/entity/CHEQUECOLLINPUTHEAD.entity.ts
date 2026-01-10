import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CHEQUECOLLINPUTHEAD {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    HEAD_TYPE: string

    @Column()
    GL_CODE: number

    @Column({ nullable: true })
    SERIAL_NO: number

    @Column({ nullable: true })
    HEAD_DESCRIPTION: string
}
