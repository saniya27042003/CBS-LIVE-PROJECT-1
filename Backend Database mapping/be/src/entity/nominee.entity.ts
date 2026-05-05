import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CITYMASTER } from './city-master.entity';
import { DPMASTER } from './dpmaster.entity';
import { SHMASTER } from './share-master.entity';
import { PGMASTER } from './pgmaster.entity'; // 1. Import PGMASTER

@Entity()
export class NOMINEELINK {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  AC_NNAME!: string;

  @Column({ nullable: true })
  AC_NRELA!: string;

  @Column({ nullable: true })
  AC_NDATE!: string;

  @Column({ nullable: true })
  AGE!: string;

  @Column({ nullable: true })
  AC_NHONO!: string;

  @Column({ nullable: true })
  AC_NWARD!: string;

  @Column({ nullable: true })
  AC_NADDR!: string;

  @Column({ nullable: true })
  AC_NGALLI!: string;

  @Column({ nullable: true })
  AC_NAREA!: string;

  @Column({ nullable: true })
  AC_CITYNAME!: string;

  @Column({ nullable: true })
  sharesID!: number;

  @Column({ nullable: true })
  DPMasterID!: number;

  // 2. Add the column name exactly as it appears in your DB (image_11d956.png)
  @Column({ nullable: true })
  pigmyAID!: number; 

  @Column({ nullable: true })
  AC_NCTCODE!: number;

  @ManyToOne(() => CITYMASTER, { nullable: true })
  @JoinColumn({ name: 'AC_NCTCODE' })
  city?: CITYMASTER;

  @ManyToOne(() => SHMASTER, { nullable: true })
  @JoinColumn({ name: 'sharesID' })
  shares?: SHMASTER;

  @ManyToOne(() => DPMASTER, { nullable: true })
  @JoinColumn({ name: 'DPMasterID' })
  dpmaster?: DPMASTER;

  // 3. Add the relationship mapping for Pigmy accounts
  @ManyToOne(() => PGMASTER, { nullable: true })
  @JoinColumn({ name: 'pigmyAID' })
  pgmaster?: PGMASTER;

}