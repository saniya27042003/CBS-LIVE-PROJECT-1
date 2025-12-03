<<<<<<< HEAD
import { DENOMINATION } from 'src/entity//DENOMINATION.entity';

import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class USERDENOMINATION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  CASHIER_CODE: string;

  @Column({ default: 0 })
  DENO_2000: number;

  @Column({ default: 0 })
  DENO_1000: number;

  @Column({ default: 0 })
  DENO_500: number;

  @Column({ default: 0 })
  DENO_100: number;

  @Column({ nullable: true, default: 0 })
  DENO_200: number;

  @Column({ default: 0 })
  DENO_50: number;

  @Column({ default: 0 })
  DENO_20: number;

  @Column({ default: 0 })
  DENO_10: number;

  @Column({ default: 0 })
  DENO_5: number;

  @Column({ default: 0 })
  DENO_2: number;

  @Column({ default: 0 })
  DENO_1: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DENO_COINS_AMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  TOTAL_AMOUNT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  OPENING_CASH: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  DEPOSITS: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  WITHDRAWAL: number;

  @Column({ default: 0 })
  BRANCH_CODE: number;

  // @ManyToOne(()=> DENOMINATION,(Denomination)=>Denomination.userdenomination)
  // @JoinColumn({name:"DenominationId"})
  // Denomination:DENOMINATION[]

  // @ManyToOne(() => USERDEFINATION, (userdefination) => userdefination.userdenomination)
  // @JoinColumn({name:"userdefinationId"})
  // userdefination:USERDEFINATION[]
}
=======
import { DENOMINATION } from './DENOMINATION.entity';

import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class USERDENOMINATION {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    CASHIER_CODE: string

    @Column({ default: 0 })
    DENO_2000: number

    @Column({ default: 0 })
    DENO_1000: number

    @Column({ default: 0 })
    DENO_500: number

    @Column({ default: 0 })
    DENO_100: number

    @Column({ nullable: true, default: 0 })
    DENO_200: number

    @Column({ default: 0 })
    DENO_50: number

    @Column({ default: 0 })
    DENO_20: number

    @Column({ default: 0 })
    DENO_10: number

    @Column({ default: 0 })
    DENO_5: number

    @Column({ default: 0 })
    DENO_2: number

    @Column({ default: 0 })
    DENO_1: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DENO_COINS_AMT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    TOTAL_AMOUNT: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    OPENING_CASH: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    DEPOSITS: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    WITHDRAWAL: number

    @Column({ default: 0 })
    BRANCH_CODE: number

    // @ManyToOne(()=> DENOMINATION,(Denomination)=>Denomination.userdenomination)
    // @JoinColumn({name:"DenominationId"})
    // Denomination:DENOMINATION[]



    // @ManyToOne(() => USERDEFINATION, (userdefination) => userdefination.userdenomination)
    // @JoinColumn({name:"userdefinationId"})
    // userdefination:USERDEFINATION[]
}
>>>>>>> 4ad060f30ce45d7b10b77bb6e7522ec4db76c0ea
