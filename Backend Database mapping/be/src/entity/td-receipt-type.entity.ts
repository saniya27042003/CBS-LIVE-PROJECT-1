import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TDRECEIPTMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  RECEIPT_TYPE: string;

  @Column({ default: 0 })
  LAST_RECEIPT_NO: number;
}
