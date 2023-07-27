import { Column, Entity, OneToMany } from "typeorm"
import { Base } from './extends/base.extend'
import { User } from "./User.entity"

@Entity()
export class Company extends Base {
  
  @Column()
  name: string

  @Column()
  address: string

  @Column()
  logo: string

  @Column()
  createdBy: string

  @OneToMany(() => User, (user) => user.id)
  User: User[]
  
}
