import { ACDOCUMENTDETAILS } from './ACDOCUMENTDETAILS.entity';
import { SCHEMEDOCUMENTLINK } from './scheme-linking-with-d.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CUSTDOCUMENT } from './document.entity'
@Entity()
export class DOCUMENTMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CODE: number;

  @Column({ length: 100 })
  NAME: string;

  @OneToMany(() => CUSTDOCUMENT, custdocument => custdocument.DocumentMaster, {
    cascade: ["insert", "update"]
  })
  custdocument: CUSTDOCUMENT[];

//  @OneToMany(
//   () => ACDOCUMENTDETAILS,
//   (acDocumentDetails) => acDocumentDetails.acDocumentMaster
// )
// acDocumentMaster: ACDOCUMENTDETAILS[];

@OneToMany(
  () => ACDOCUMENTDETAILS,
  (acDocumentDetails) => acDocumentDetails.documentMaster
)
acDocumentDetails: ACDOCUMENTDETAILS[];



  @OneToMany(() => SCHEMEDOCUMENTLINK, schemeDocumentMaster => schemeDocumentMaster.schemeDocumentMaster, {
    cascade: ["insert", "update"]
  })
  schemeDocumentMaster: SCHEMEDOCUMENTLINK[];


}
