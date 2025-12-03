import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IDMASTER } from './customer-id.entity';
import { DOCUMENTMASTER } from './document-master.entity';
@Entity()
export class CUSTDOCUMENT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PATH: string;

  // @Column()
  // NAME: string

  @Column()
  idmasterID: number;

  @ManyToOne(() => IDMASTER, (idmaster) => idmaster.custdocument, {
    cascade: true,
  })
  @JoinColumn({ name: 'idmasterID' })
  idmaster: IDMASTER[];

  @Column()
  DocumentMasterID: number;

  @ManyToOne(
    () => DOCUMENTMASTER,
    (DocumentMaster) => DocumentMaster.custdocument,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'DocumentMasterID' })
  DocumentMaster: DOCUMENTMASTER[];
}
