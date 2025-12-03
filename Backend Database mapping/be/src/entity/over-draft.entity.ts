import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TODTRAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ length: 15, default: 0 })
  AC_NO: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_ODAMT: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  AC_SODAMT: number;

  @Column({ nullable: true })
  AC_ODDAYS: number;

  @Column({ nullable: true })
  AC_ODDATE: string;

  @Column({ nullable: true })
  RELEASE_DATE: string;
}
