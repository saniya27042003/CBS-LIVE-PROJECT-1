import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SMSMAST {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    SMS_ID: number
    @Column({ nullable: true })
    TEMPLATE_ID: string
    @Column({ nullable: true })
    TEMPLATE_CONTENT: string
}
