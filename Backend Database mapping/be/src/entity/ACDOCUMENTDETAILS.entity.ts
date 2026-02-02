import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SCHEMAST } from './schemeParameters.entity';
import { DOCUMENTMASTER } from './document-master.entity';
@Entity()
export class ACDOCUMENTDETAILS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    AC_ACNOTYPE: string

    @Column()
    AC_TYPE: number

    @Column()
    AC_NO: number

    @Column()
    DOCUMENT_CODE: number

   // Scheme relation
@ManyToOne(() => SCHEMAST)
@JoinColumn({ name: "AC_TYPE" })
scheme: SCHEMAST;

// Document master relation
@ManyToOne(() => DOCUMENTMASTER)
@JoinColumn({ name: "DOCUMENT_CODE" })
documentMaster: DOCUMENTMASTER;

}
