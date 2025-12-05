
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
 
@Entity()
export class VOUCHERHISTORY {
 
 
    // @PrimaryGeneratedColumn()
    // id : number;
 
    // @Column()
    // ACTION_TYPE : string
 
 
   
    // @ManyToOne(() => USERDEFINATION, user => user.id)
    // ACTION_BY: Number;
   
 
 
    // @Column()
    // ACTION_DATE :string
 
    // @Column()
    // ACTION_TIME :string
 
    // @Column()
    // VOUCHER_NO : Number    //relation  user dailytran
 
 
 
 
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  VOUCHER_NO: number;
 
  @Column()
  ACTION_TYPE: string;
 
//   @ManyToOne(() => USERDEFINATION, user => user.id)
 @Column()
  ACTION_BY: number;
 
  @Column()
  ACTION_TIME: string;
 
  @Column()
  ACTION_DATE: string;
 
  @Column()
  APPROVED_BY: number;
 
 
   
 
 
 
}