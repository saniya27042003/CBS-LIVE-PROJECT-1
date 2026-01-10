import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PREMATULESS } from './pigmy-less-int.entity';

@Entity()
export class PREMATULESSRATE {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  EFFECT_DATE: string;

  @OneToMany(() => PREMATULESS, rate => rate.idRate, {
    cascade: ["insert", "update"]
  })
  rate: PREMATULESS[];


  @Column({ nullable: true })
  AC_ACNOTYPE: number;
  @ManyToOne(() => SCHEMAST, (scheme) => scheme.prepigmy, {
    cascade: true
  })
  @JoinColumn({ name: "AC_ACNOTYPE" })
  scheme: SCHEMAST[];

}
