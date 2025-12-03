import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CNFSMSDIRECTOR {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  BANK_CODE: number;

  @Column({ nullable: true })
  ENG_BANK_NAME: string;

  @Column({ nullable: true })
  UNI_BANK_NAME: string;

  @Column({ nullable: true })
  SMS_TYPE: string;

  @Column({ nullable: true })
  DIRECTOR_SMS_ALLOW: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_DAYEND: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_INTCAL: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_LNEXP: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_LNEXP_PRD: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_LNINST: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_LNINST_PRD: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_GLPOSITION: number;

  @Column({ nullable: true })
  DIRECTOR_SMS_GLAC: string;

  @Column({ nullable: true })
  DIRECTOR_SMS_GL_PRD: number;
}
