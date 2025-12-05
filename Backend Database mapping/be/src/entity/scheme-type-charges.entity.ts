import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CHARGESAMT } from './charges.entity';

@Entity()
export class CHARGES {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EFFECT_DATE: string;

  @Column()
  ACNOTYPE: string;

  @Column({ nullable: true })
  CHARGES_TYPE: string;

  @Column({ nullable: true })
  CHARGES_GL_ACNO: string;

  @OneToMany(() => CHARGESAMT, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: CHARGESAMT[];
}
