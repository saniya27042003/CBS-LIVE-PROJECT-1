import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PAYORDERITEMS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  PO_TRAN_NO: number;

  @Column({ nullable: true })
  PO_TRAN_DATE: string;

  @Column({ nullable: true })
  SERIAL_NO: number;

  @Column({ nullable: true })
  PAYORDER_AMOUNT: number;

  @Column({ nullable: true })
  BANK_COMMISSION_AMOUNT: number;

  @Column({ nullable: true })
  IN_FAVOUR_OF_NAME: string;

  @Column({ nullable: true })
  PO_SERIES: string;

  @Column({ nullable: true })
  PAYORDER_NO: number;

  @Column({ nullable: true })
  IS_PRINTED: number;

  @Column({ nullable: true })
  TRAN_STATUS: string;

  @Column({ nullable: true })
  REJECT_OFFICER_CODE: string;

  @Column({ nullable: true })
  COLLECTION_DATE: string;
}
