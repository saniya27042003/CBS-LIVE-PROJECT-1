import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CDRATIO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    CODE: number

    @Column({ default: 0 })
    STATUS_DP: number

    @Column({ default: 0 })
    STATUS_LN: number

    @Column({ default: 0 })
    STATUS_A: number

    @Column({ default: 0 })
    STATUS_B: number

    @Column({ nullable: true })
    BRANCH_CODE: Number

}
