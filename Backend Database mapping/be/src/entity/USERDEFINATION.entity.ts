import { timeStamp } from 'console';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { ROLE_DEFINE } from './ROLE_DEFINE.entity';
import { VOUCHERHISTORY } from './VOUCHERHISTORY.entity';

@Entity()
@Unique(['USER_NAME'])
export class USERDEFINATION {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  F_NAME: string;

  @Column({ nullable: true })
  L_NAME: String;

  @Column({ nullable: true })
  DOB: string;

  @Column({ nullable: true })
  MOB_NO: string;

  @Column({ nullable: true })
  EMAIL: string;

  @Column()
  USER_NAME: string;

  @Column({ nullable: true })
  PASSWORD: string;

  @Column({ nullable: true })
  STATUS: string;

  @Column({ nullable: true })
  PROFILE_PATH: string;

  @Column({ nullable: true })
  EXP_DATE: string;

  @Column({ default: 0 })
  LOG_STATUS: string;

  // @Index({ unique: true })
  // @Column({ type: 'varchar', nullable: true, unique: true })
  // roleId:String;

  @Column()
  branchId: String;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  USER_CREATED_AT: Date;

  @Column()
  USER_PIN: string;

  @Column()
  isPinVerified: string;

  // @ManyToOne(type=> ROLEDATAMASTER,role=>role.user)
  // @JoinColumn({name:"roleId"})
  // Role : ROLEDATAMASTER

  @OneToMany((type) => ROLE_DEFINE, (RoleDefine) => RoleDefine.user)
  RoleDefine: ROLE_DEFINE;

  @ManyToOne((type) => OWNBRANCHMASTER, (branch) => branch.id)
  @JoinColumn({ name: 'branchId' })
  branch: OWNBRANCHMASTER[];

  @OneToMany(() => VOUCHERHISTORY, (voucher) => voucher.ACTION_BY)
  vouchers: VOUCHERHISTORY[];
}
