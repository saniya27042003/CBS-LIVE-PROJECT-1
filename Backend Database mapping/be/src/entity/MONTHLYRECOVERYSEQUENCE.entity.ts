import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MONTHLYRECOVERYSEQUENCE {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    S_APPL: string

    @Column({ nullable: true })
    SEQ_NO: number

    @Column({ nullable: true })
    S_SHRNAME: string

    @Column({ nullable: true })
    RECOVERY_FIELD: string

    @Column({ nullable: true })
    RECOVERY_ACTYPE_FIELD: string

    @Column({ nullable: true })
    RECOVERY_ACNO_FIELD: string

    @Column({ nullable: true })
    IS_APPLICABLE: number

    @Column({ nullable: true })
    ALLOW_EDITAMT: number

    @Column({ nullable: true })
    ALLOW_EXTRAAMT: number


}
