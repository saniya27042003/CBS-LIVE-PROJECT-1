import { CITYMASTER } from './city-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DPMASTER } from './dpmaster.entity';
import { PGMASTER } from './pgmaster.entity';
import { SHMASTER } from './share-master.entity';
@Entity()
export class NOMINEELINK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_NNAME: string;

  @Column({ nullable: true })
  AC_NRELA: string;

  @Column({ nullable: true })
  AC_NDATE: string;

  @Column({ nullable: true })
  AGE: string;

  @Column({ nullable: true })
  AC_NHONO: string;

  @Column({ nullable: true })
  AC_NWARD: string;

  @Column({ nullable: true })
  AC_NADDR: string;

  @Column({ nullable: true })
  AC_NGALLI: string;

  @Column({ nullable: true })
  AC_NAREA: string;

  @Column({ nullable: true })
  AC_CITYNAME: string;

  @Column({ nullable: true })
  AC_NCTCODE: number;
  @ManyToOne(() => CITYMASTER, (city) => city.cityMasters, {
    cascade: true,
  })
  @JoinColumn({ name: 'AC_CTCODE' })
  city: CITYMASTER[];

  @Column({ nullable: true })
  AC_NPIN: string;

  @Column({ nullable: true })
  sharesID: number;

  @ManyToOne(() => SHMASTER, (sharesId) => sharesId.nomineeDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'sharesID' })
  sharesId: SHMASTER[];

  @Column({ nullable: true })
  DPMasterID: number;

  @ManyToOne(() => DPMASTER, (dpmasterId) => dpmasterId.nomineeDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'DPMasterID' })
  dpmasterId: DPMASTER[];

  @Column({ nullable: true })
  pigmyAID: number;

  @ManyToOne(() => PGMASTER, (pigmyAccount) => pigmyAccount.nomineeDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'pigmyAID' })
  pgmasterId: PGMASTER[];

  //pigmy agent

  // @Column({ nullable: true })
  // PGMasterID: number
  // @ManyToOne(() => DPMASTER, (pgmasterId) => pgmasterId.nomineeDetails, {
  //     cascade: true
  // })
  // @JoinColumn({ name: "PGMasterID" })
  // pgmasterId: PGMASTER[];
}
