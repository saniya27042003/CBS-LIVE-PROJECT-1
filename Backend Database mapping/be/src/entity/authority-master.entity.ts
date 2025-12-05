import { LNMASTER } from './term-loan-master.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AUTHORITYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  @OneToMany(() => LNMASTER, authority => authority.authority, {
    cascade: ["insert", "update"]
  })
  authority: LNMASTER[];
}
