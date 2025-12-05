import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SHARDETL {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    AC_NO: number

    @Column()
    AC_TYPE: string

    @Column({ nullable: true })
    AC_HONO: number

    @Column({ nullable: true })
    AC_HOSUBNO: string

    @Column({ nullable: true })
    AC_WARD: string

    @Column({ nullable: true })
    AC_ADDR: string

    @Column({ nullable: true })
    AC_GALLI: string

    @Column({ nullable: true })
    AC_AREA: string

    @Column({ nullable: true })
    AC_THONO: number

    @Column({ nullable: true })
    AC_THOSUBNO: string

    @Column({ nullable: true })
    AC_TWARD: string

    @Column({ nullable: true })
    AC_TADDR: string

    @Column({ nullable: true })
    AC_TGALLI: string

    @Column({ nullable: true })
    AC_TAREA: string

    @Column({ nullable: true })
    AC_TCTCODE: number

    @Column({ nullable: true })
    AC_TPIN: number

    @Column({ nullable: true })
    AC_RESNO: string

    @Column({ nullable: true })
    AC_RESDT: string

    @Column({ nullable: true })
    AC_NNAME: string

    @Column({ nullable: true })
    AC_NDATE: string

    @Column({ nullable: true })
    AC_NRELA: string

    @Column({ nullable: true })
    AC_NOM_AGE: number

    @Column({ nullable: true })
    AC_NHONO: number

    @Column({ nullable: true })
    AC_NHOSUBNO: string

    @Column({ nullable: true })
    AC_NWARD: string

    @Column({ nullable: true })
    AC_NADDR: string

    @Column({ nullable: true })
    AC_NGALLI: string

    @Column({ nullable: true })
    AC_NAREA: string

    @Column({ nullable: true })
    AC_NCTCODE: number

    @Column({ nullable: true })
    AC_NPIN: number

    @Column({ nullable: true })
    AC_NARR: string

    @Column({ nullable: true })
    AC_SREPRESENT: string

    @Column()
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    AC_OTH_HONO: number

    @Column({ nullable: true })
    AC_OTH_HOSUBNO: string

    @Column({ nullable: true })
    AC_OTH_WARD: string

    @Column({ nullable: true })
    AC_OTH_ADDR: string

    @Column({ nullable: true })
    AC_OTH_GALLI: string

    @Column({ nullable: true })
    AC_OTH_AREA: string

    @Column({ nullable: true })
    AC_OTH_THONO: number

    @Column({ nullable: true })
    AC_OTH_THOSUBNO: string

    @Column({ nullable: true })
    AC_OTH_TWARD: string

    @Column({ nullable: true })
    AC_OTH_TADDR: string

    @Column({ nullable: true })
    AC_OTH_TGALLI: string

    @Column({ nullable: true })
    AC_OTH_TAREA: string

    @Column({ nullable: true })
    AC_OTH_TCTCODE: number

    @Column({ nullable: true })
    AC_OTH_TPIN: number

    @Column({ nullable: true })
    AC_DEV_NAME: string

    @Column({ nullable: true })
    AC_DEV_ADD: string

    @Column({ nullable: true })
    AC_DEV_WARD: string

    @Column({ nullable: true })
    AC_DEV_GALLI: string

    @Column({ nullable: true })
    AC_DEV_AREA: string

    @Column({ nullable: true })
    AC_DEV_CITYCODE: number

    @Column({ nullable: true })
    AC_ENG_NAME: string

    @Column({ nullable: true })
    AC_ENG_HONO: string

    @Column({ nullable: true })
    AC_ENG_HOSUBNO: string

    @Column({ nullable: true })
    AC_ENG_ADD: string

    @Column({ nullable: true })
    AC_ENG_WARD: string

    @Column({ nullable: true })
    AC_ENG_GALLI: string

    @Column({ nullable: true })
    AC_ENG_AREA: string

    @Column({ nullable: true })
    AC_ENG_CITY: string

    @Column({ nullable: true })
    AC_INSU_CODE: number

    @Column({ nullable: true })
    AC_INSU_DATE: string

    @Column({ nullable: true })
    AC_INSU_POLICYNO: string

    @Column({ nullable: true })
    AC_INSU_PLANNAME: string

    @Column({ nullable: true })
    AC_INSU_POLICYAMT: number

    @Column({ nullable: true })
    AC_INSU_TERM: number

    @Column({ nullable: true })
    AC_INSU_PREMAMT: number

    @Column({ nullable: true })
    AC_INSU_EXPDATE: string

    @Column({ nullable: true })
    AC_INSU_NEXTPREMDATE: string

    @Column({ nullable: true })
    AC_INSU_IS_REFUND: number




}
