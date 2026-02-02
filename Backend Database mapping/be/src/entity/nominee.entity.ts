import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CITYMASTER } from './city-master.entity';
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
  sharesID: number;

  @Column({ nullable: true })
  DPMasterID: number;

  @Column({ nullable: true })
  PGMasterID: number;

@Column({ nullable: true })
AC_NCTCODE: number;

@ManyToOne(() => CITYMASTER, { nullable: true })
@JoinColumn({ name: 'AC_NCTCODE' })
city?: CITYMASTER;

@ManyToOne(() => SHMASTER, { nullable: true })
@JoinColumn({ name: 'sharesID' })
shares?: SHMASTER;

@ManyToOne(() => DPMASTER, { nullable: true })
@JoinColumn({ name: 'DPMasterID' })
dpmaster?: DPMASTER;

@ManyToOne(() => PGMASTER, { nullable: true })
@JoinColumn({ name: 'PGMasterID' })
pgmaster?: PGMASTER;

}
