import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SUBSALARYMASTER } from './sub-salary-division-master.entity';
@Entity()
export class SALARYDIVISIONMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  @Column({ length: 50 })
  SHORT_NAME: string;

  @Column({ length: 50, nullable: true })
  AT_POST: string;

  @Column({ length: 50, nullable: true })
  TALUKA_NAME: string;

  @Column({ length: 50, nullable: true })
  DISTRICT_NAME: string;



  @Column({ length: 10, nullable: true })
  PHNO: string;

  @Column({ length: 10, nullable: true })
  MOBNO: string;

  @Column({ nullable: true })
  BRANCH_CODE: number;
  @ManyToOne(() => OWNBRANCHMASTER)
  @JoinColumn({ name: "BRANCH_CODE" })
  branch: OWNBRANCHMASTER[];

  @OneToMany(() => SUBSALARYMASTER, subsalary => subsalary.sub, {
    cascade: ["insert", "update"]
  })
  subsalary: SUBSALARYMASTER[];
}
