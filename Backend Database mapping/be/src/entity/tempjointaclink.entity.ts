import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class TEMPJOINTACLINK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  JOINT_AC_CUSTID: number;

  @Column({ nullable: true })
  JOINT_ACNAME: string;

  @Column({ nullable: true })
  OPERATOR: string;

  @Column({ unique: false, nullable: true })
  DPMasterID: number;

  @Column({ unique: false, nullable: true })
  PGMasterID: number;
}
