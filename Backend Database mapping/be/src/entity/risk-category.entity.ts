import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
//mport { IDMASTER } from './customer-id.entity'
@Entity({name:'riskcategorymaster'})
export class RISKCATEGORYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ type: 'varchar', length: 100 })
  NAME: string;

//  @ManyToOne(() => RISKCATEGORYMASTER)
// @JoinColumn({ name: "AC_RISKCATG" })
// riskCategory: RISKCATEGORYMASTER;

}
