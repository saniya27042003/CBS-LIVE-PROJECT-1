import { BANKMASTER } from './bank-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AUTODDNO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    BANK_CODE: number

    @Column({ nullable: true })
    DRAFT_NO: string

    @ManyToOne(() => BANKMASTER, (bankCode) => bankCode.bankCode, {
        cascade: true
    })
    @JoinColumn({ name: "BANK_CODE" })
    bankCode: BANKMASTER[];
}



