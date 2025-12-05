import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DDCITYMASTER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number

    @Column()
    NAME: string

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string


}
