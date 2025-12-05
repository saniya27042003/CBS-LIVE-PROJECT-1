import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NOTICEBLANKFORMAT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number

    @Column({ nullable: true })
    NAME: string

    @Column({ nullable: true })
    LETTERTEXT: string

    @Column({ nullable: true })
    NOTICETYPE: number

    @Column({ nullable: true })
    LNDEP: string

}
