
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CLEARINGHOUSEMASTER {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number

    @Column()
    NAME: string

    @Column()
    GL_ACNO: number

    @Column({ nullable: true })
    CLEARING_HOUSE_NO: string

    @Column({ nullable: true })
    HO_SUB_GLACNO: number

}