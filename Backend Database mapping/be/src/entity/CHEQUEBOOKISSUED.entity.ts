import { OWNBRANCHMASTER } from './own-branch-master.entity';
import { SCHEMAST } from './schemeParameters.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CHEQUEBOOKISSUED {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    DOC_NO: number

    @Column()
    AC_BRANCH: number

    @Column()
    AC_TYPE: number

    @Column({ length: 15 })
    AC_NO: string

    @Column()
    ISSUE_DATE: string

    @Column()
    CHEQUEBOOK_SERIES: string

    @Column()
    CHEQUE_NO_FROM: number

    @Column()
    CHEQUE_NO_TO: number

    @Column({ nullable: true })
    NO_OF_BOOKS: number

    @Column({ nullable: true })
    CHEQUES_PER_BOOK: number

    @Column({ nullable: true })
    TOTAL_LEAVES: number

    @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
    CHEQUE_CHARGES: number

    @Column({ nullable: true })
    USER_CODE: string

    @Column({ nullable: true })
    OFFICER_CODE: string

    @Column()
    AC_ACNOTYPE: string

    @Column({ nullable: true })
    IS_MICR_CHEQUE: number

    @ManyToOne(() => OWNBRANCHMASTER, (chequebook) => chequebook.chequebook, {
        cascade: true
    })
    @JoinColumn({ name: "AC_BRANCH" })
    chequebook: OWNBRANCHMASTER[];


    @ManyToOne(() => SCHEMAST, (chequeBook) => chequeBook.chequeBook, {
        cascade: true
    })
    @JoinColumn({ name: "AC_TYPE" })
    chequeBook: SCHEMAST[];

}
