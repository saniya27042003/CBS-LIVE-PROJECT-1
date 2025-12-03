import { DOCUMENTMASTER } from './document-master.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SCHEMEDOCUMENTLINK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SCHEME_CODE: string;

  @Column({ nullable: true })
  DOCUMENT_CODE: number;

  @Column({ default: 1 })
  ISACTIVE: number;

  @ManyToOne(
    () => DOCUMENTMASTER,
    (schemeDocumentMaster) => schemeDocumentMaster.custdocument,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'DOCUMENT_CODE' })
  schemeDocumentMaster: DOCUMENTMASTER[];
}
