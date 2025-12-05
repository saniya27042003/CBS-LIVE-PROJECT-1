
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { USERDEFINATION } from "./USERDEFINATION.entity";
import { ROLEDATAMASTER } from "./ROLEDATAMASTER.entity";

 
@Entity()
export class ROLE_DEFINE {
 
    @PrimaryGeneratedColumn()
    id : Number;
 
    @Column()
    UserId : Number;
 
    @Column()
    RoleId : Number;
 
    @ManyToOne(type=>ROLEDATAMASTER, Role => Role.id)
    @JoinColumn({name: "RoleId"})
    Role : ROLEDATAMASTER[];
 
    @ManyToOne(type=>USERDEFINATION,user=>user.id)
    @JoinColumn({name:"UserId"})
    user : USERDEFINATION[]
}