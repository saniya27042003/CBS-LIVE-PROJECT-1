import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SUBSIDARYMASTER {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @Generated('increment')
    CODE: number

    @Column()
    NAME: string


}
