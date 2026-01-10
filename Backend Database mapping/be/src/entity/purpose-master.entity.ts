
import { LNMASTER } from './term-loan-master.entity';
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PURPOSEMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

  @OneToMany(() => LNMASTER, purpose => purpose.purpose, {
    cascade: ["insert", "update"]
  })
  purpose: LNMASTER[];
}
