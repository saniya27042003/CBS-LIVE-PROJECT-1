import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class REGIONMASTER {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('increment')
    CODE: number

    @Column({ nullable: true })
    NAME: string




}
