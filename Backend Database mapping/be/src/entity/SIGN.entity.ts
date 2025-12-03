import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SIGN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ACNOTYPE: string;

  @Column({ nullable: true })
  AC_TYPE: string;

  @Column({ nullable: true })
  AC_NO: number;

  @Column({ nullable: true })
  SIGN1: string;

  @Column({ nullable: true })
  SIGN2: string;

  @Column({ nullable: true })
  SIGN3: string;

  @Column({ nullable: true })
  SIGN4: string;

  @Column({ nullable: true })
  PHOTO: string;
}
