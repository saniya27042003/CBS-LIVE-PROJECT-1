/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DENOMINATION {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TRAN_DATE: string

    @Column()
    DENO_TRAN_NO: number

    @Column({ nullable: true })
    TOKEN_NO: number

    @Column({ nullable: true })
    TRAN_TIME: string

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CREDIT_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEBIT_AMOUNT: number

    @Column({ nullable: true })
    DENO_TYPE: string

    @Column({ nullable: true })
    ACCEPT_1000: number

    @Column({ nullable: true })
    ACCEPT_500: number

    @Column({ nullable: true })
    ACCEPT_100: number

    @Column({ nullable: true })
    ACCEPT_50: number

    @Column({ nullable: true })
    ACCEPT_20: number

    @Column({ nullable: true })
    ACCEPT_10: number

    @Column({ nullable: true })
    ACCEPT_5: number

    @Column({ nullable: true })
    ACCEPT_2: number

    @Column({ nullable: true })
    ACCEPT_1: number

    @Column({ nullable: true })
    ACCEPT_COINS: number

    @Column({ nullable: true })
    PAYMENT_1000: number

    @Column({ nullable: true })
    PAYMENT_500: number

    @Column({ nullable: true })
    PAYMENT_100: number

    @Column({ nullable: true })
    PAYMENT_50: number

    @Column({ nullable: true })
    PAYMENT_20: number

    @Column({ nullable: true })
    PAYMENT_10: number

    @Column({ nullable: true })
    PAYMENT_5: number

    @Column({ nullable: true })
    PAYMENT_2: number

    @Column({ nullable: true })
    PAYMENT_1: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    PAYMENT_COINS: number

    @Column({ nullable: true })
    CASHIER_CODE: string

    @Column({ nullable: true })
    ACCEPT_2000: number

    @Column({ nullable: true })
    PAYMENT_2000: number

    @Column({ nullable: true })
    ACCEPT_200: number

    @Column({ nullable: true })
    PAYMENT_200: number

    @Column({ nullable: true })
    BRANCH_CODE: number
}
