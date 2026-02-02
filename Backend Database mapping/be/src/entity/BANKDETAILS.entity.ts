//import { BANKMASTER } from './bank-master.entity';
import { CITYMASTER } from './city-master.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BANKDETAILS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    BANK_CODE: number

    @Column({ nullable: true })
    TAN_NO: string

    @Column({ nullable: true })
    NAME: string

    @Column({ nullable: true })
    PAN_NO: string

    @Column({ nullable: true })
    FLAT_PRM_NO: string

    @Column({ nullable: true })
    FLAT_PRM_NAME: string

    @Column({ nullable: true })
    RD_LANE_NAME: string

    @Column({ nullable: true })
    AREA_LOCATION: string

    // @Column({ nullable: true })
    // CITY_CODE: number

    @Column({ nullable: true })
    PIN_CODE: number

    @Column({ nullable: true })
    PHONE_OFFICE: string

    @Column({ nullable: true })
    EMAIL: string

    @Column({ nullable: true })
    SHORT_NAME: string

    @Column({ nullable: true })
    GST_NO: string

    @Column({ nullable: true })
    SBI_BANKCODE: string

    @Column({ nullable: true })
    MOB_NUM: string

    @Column({ nullable: true })
    STATE: string

    @Column({ nullable: true })
    BRANCH_CODE: number;
    @Column({ nullable: true })
    HO_GL: number;
    @Column({ default: 0 })
    IBT_TRAN: number;
    @Column({ nullable: true })
    IFSC_CODE: string;

    // @ManyToOne(() => BANKMASTER, (bankDetails) => bankDetails.bankDetails, {
    //     cascade: true
    // })
    // @JoinColumn({ name: "BANK_CODE" })
    // bankDetails: BANKMASTER[];


   @Column({ nullable: true })
CITY_CODE: number;

@ManyToOne(() => CITYMASTER, { nullable: true })
@JoinColumn({ name: "CITY_CODE" })
bankDetailCity?: CITYMASTER;

}
