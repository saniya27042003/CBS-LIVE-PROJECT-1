import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customeraddress' })
export class CUSTOMERADDRESS {

  // @BeforeInsert()
  // logInsert() {
  //   console.log('🔥 BeforeInsert hook triggered');
  // }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  AC_HONO: string;

  @Column({ nullable: true })
  AC_WARD: string;

  @Column({ nullable: true })
  AC_ADDR: string;

  @Column({ nullable: true })
  AC_GALLI: string;

  @Column({ nullable: true })
  AC_AREA: string;

  @Column({ nullable: true })
  AC_CTCODE: number;

  @Column({ nullable: true })
  AC_PIN: string;

  @Column({ default: false })
  AC_ADDFLAG: boolean;

  @Column({ default: 'P' })
  AC_ADDTYPE: string;

  @Column()
  idmasterID: number;
}