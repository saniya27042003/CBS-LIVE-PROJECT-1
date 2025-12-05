import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NOTICEMASTER {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @Generated('increment')
    CODE: number

    @Column({ nullable: true })
    NAME: string

    @Column({ nullable: true })
    NOTICE_LANGUAGE: string

    @Column({ nullable: true })
    SERIAL_NO: number


}
