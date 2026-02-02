import { BOOKDEBTS } from './book-debts.entity';
import { SECINSURANCE } from './customer-insurance.entity';
import { FIREPOLICY } from './fire-policy.entity';
import { FURNITURE } from './furniture-and-fixture.entity';
import { GOLDSILVER } from './gold-and-silver.entity';
import { GOVTSECULIC } from './govt-security-and-lic.entity';
import { LANDBUILDING } from './land-and-buildings.entity';
import { MARKETSHARE } from './market-shares.entity';
import { OTHERSECURITY } from './other-security.entity';
import { OWNDEPOSIT } from './own-deposits.entity';
import { PLANTMACHINARY } from './plant-and-machinery.entity';
import { PLEDGESTOCK } from './pleadge-stock.entity';
import { STOCKSTATEMENT } from './stock-statement.entity';
import { VEHICLE } from './vehicle.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SECURITYMASTER {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('increment')
  SECU_CODE: number;

  @Column({ nullable: true })
  SECU_NAME: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  MARGIN: number;

  @Column({ default: 0 })
  FIRE_POLICY: number;

  @Column({ default: 0 })
  MARKET_SHARE: number;

  @Column({ default: 0 })
  BOOK_DEBTS: number;

  @Column({ default: 0 })
  PLEDGE_STOCK: number;

  @Column({ default: 0 })
  STOCK_STATEMENT: number;

  @Column({ default: 0 })
  GOVT_SECU_LIC: number;

  @Column({ default: 0 })
  PLANT_MACHINARY: number

  @Column({ default: 0 })
  FURNITURE_FIXTURE: number;

  @Column({ default: 0 })
  VEHICLE: number;

  @Column({ default: 0 })
  OWN_DEPOSIT: number;

  @Column({ default: 0 })
  LAND_BUILDING: number;

  @Column({ default: 0 })
  GOLD_SILVER: number;

  @Column({ default: 0 })
  OTHER_SECURITY: number;

  @Column({ default: 0 })
  CUST_INSURANCE: number;

  @OneToMany(() => BOOKDEBTS, bookdebts => bookdebts.bookdebts, {
    cascade: ["insert", "update"]
  })
  bookdebts: BOOKDEBTS[];

  @OneToMany(() => SECINSURANCE, custinsurance => custinsurance.custinsurance, {
    cascade: ["insert", "update"]
  })
  custinsurance: SECINSURANCE[];

  @OneToMany(() => FIREPOLICY, firepolicy => firepolicy.firepolicy, {
    cascade: ["insert", "update"]
  })
  firepolicy: FIREPOLICY[];

  @OneToMany(() => FURNITURE, furfixture => furfixture.furfixture, {
    cascade: ["insert", "update"]
  })
  furfixture: FURNITURE[];

  @OneToMany(() => GOLDSILVER, silvergold => silvergold.silvergold, {
    cascade: ["insert", "update"]
  })
  silvergold: GOLDSILVER[];

  @OneToMany(() => GOVTSECULIC, govtseclic => govtseclic.govtseclic, {
    cascade: ["insert", "update"]
  })
  govtseclic: GOVTSECULIC[];

  @OneToMany(() => LANDBUILDING, landbuilding => landbuilding.landbuilding, {
    cascade: ["insert", "update"]
  })
  landbuilding: LANDBUILDING[];

  @OneToMany(() => MARKETSHARE, share => share.share, {
    cascade: ["insert", "update"]
  })
  share: MARKETSHARE[];

  @OneToMany(() => OTHERSECURITY, other => other.other, {
    cascade: ["insert", "update"]
  })
  other: OTHERSECURITY[];

@OneToMany(() => OWNDEPOSIT, o => o.security)
deposits: OWNDEPOSIT[];


  @OneToMany(() => PLANTMACHINARY, plant => plant.plant, {
    cascade: ["insert", "update"]
  })
  plant: PLANTMACHINARY[];

  @OneToMany(() => PLEDGESTOCK, stock => stock.stock, {
    cascade: ["insert", "update"]
  })
  stock: PLEDGESTOCK[];

  @OneToMany(() => STOCKSTATEMENT, stockstat => stockstat.stockstat, {
    cascade: ["insert", "update"]
  })
  stockstat: STOCKSTATEMENT[];

  @OneToMany(() => VEHICLE, vehiclesec => vehiclesec.vehiclesec, {
    cascade: ["insert", "update"]
  })
  vehiclesec: VEHICLE[];

}