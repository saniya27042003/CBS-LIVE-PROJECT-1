

import { BANKDETAILS } from './BANKDETAILS.entity';
import { NOMINEELINK } from './nominee.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CUSTOMERADDRESS } from './customer-address.entity'
import { DIRECTORMASTER } from './director-master.entity';
import { APPLGUARANTERS } from './APPLGUARANTERS.entity';
@Entity()
export class CITYMASTER {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  CITY_CODE: number;

  @Column({ type: 'varchar', length: 100 })
  CITY_NAME: string;

  @Column({ nullable: true })
  DISTANCE: string;

  @Column({ nullable: false })
  TALUKA_CODE: string;


  @Column({ nullable: false })
  DISTRICT_CODE: string;


  @Column({ nullable: false })
  STATE_CODE: string;


  @Column({ nullable: false })
  REGION_CODE: string;

  // @Column({nullable:false})
  // AC_PIN: string;
  @OneToMany(() => CUSTOMERADDRESS, (cityMaster) => cityMaster.city, {
    cascade: ["insert", "update"]
  })
  cityMaster: CUSTOMERADDRESS[];

  @OneToMany(() => NOMINEELINK, (cityMasters) => cityMasters.city, {
    cascade: ["insert", "update"]
  })
  cityMasters: NOMINEELINK[];

  @OneToMany(() => DIRECTORMASTER, castmast => castmast.directormaster, {
    cascade: ["insert", "update"]
  })
  castmast: DIRECTORMASTER[];

  @OneToMany(() => APPLGUARANTERS, cityCode => cityCode.cityCode, {
    cascade: ["insert", "update"]
  })
  cityCode: APPLGUARANTERS[];

  @OneToMany(() => BANKDETAILS, bankDetailCity => bankDetailCity.bankDetailCity, {
    cascade: ["insert", "update"]
  })
  bankDetailCity: BANKDETAILS[];

}
