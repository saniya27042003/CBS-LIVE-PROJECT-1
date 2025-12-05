import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NPACLASSIFICATION } from './npa-class.entity'
@Entity()
export class NPAMASTER {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    EFFECT_DATE: string

    @Column()
    NPA_BASE_DAYS: number

    @OneToMany(() => NPACLASSIFICATION, (NPAClass) => NPAClass.NPA, {
        cascade: ["insert", "update"]
    })
    NPAClass: NPACLASSIFICATION[];
}
