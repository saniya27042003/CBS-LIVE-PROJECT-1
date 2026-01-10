import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MEETINGNOTICEDESIGNMASTER {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    VWNAME: string

    @Column({ nullable: true })
    DOTFILENAME: string

    @Column({ nullable: true })
    FLDNAME1: string

    @Column({ nullable: true })
    TAG1: string

    @Column({ nullable: true })
    FLDNAME2: string

    @Column({ nullable: true })
    TAG2: string

    @Column({ nullable: true })
    FLDNAME3: string

    @Column({ nullable: true })
    TAG3: string

    @Column({ nullable: true })
    FLDNAME4: string

    @Column({ nullable: true })
    TAG4: string

    @Column({ nullable: true })
    FLDNAME5: string

    @Column({ nullable: true })
    TAG5: string

    @Column({ nullable: true })
    FLDNAME6: string

    @Column({ nullable: true })
    TAG6: string

    @Column({ nullable: true })
    FLDNAME7: string

    @Column({ nullable: true })
    TAG7: string

    @Column({ nullable: true })
    FLDNAME8: string

    @Column({ nullable: true })
    TAG8: string

    @Column({ nullable: true })
    FLDNAME9: string

    @Column({ nullable: true })
    TAG9: string

    @Column({ nullable: true })
    FLDNAME10: string

    @Column({ nullable: true })
    TAG10: string


}
