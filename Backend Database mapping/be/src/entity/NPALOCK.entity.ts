import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NPALOCK {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    PROCESS_DATE: string

    @Column({ nullable: true })
    LOCK_DATE: string

    @Column({ nullable: true })
    USER_CODE: string


}
