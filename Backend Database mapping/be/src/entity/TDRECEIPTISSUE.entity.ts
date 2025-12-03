import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TDRECEIPTISSUE {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  BRANCH_CODE: number;

  @Column()
  PRINT_DATE: string;

  @Column()
  PRINT_TIME: string;

  @Column({ nullable: true })
  AC_ACNOTYPE: string;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ nullable: true })
  AC_NO: string;

  @Column({ nullable: true })
  PRINT_TYPE: string;

  @Column({ nullable: true })
  RECEIPT_NO: string;

  @Column({ nullable: true })
  REASON_OF_DUPLICATE: string;

  @Column()
  USER_CODE: string;
}
