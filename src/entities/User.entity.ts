import bcrypt from 'bcryptjs'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './extends/base.extend'
import { Company } from './Company.entity'

type IUserRoles = 'admin'|'user'|'superadmin'

@Entity()
export class User extends Base {
  
  @Column()
  firstName: string

  @Column()
  lastName: string
  
  @Column({unique: true})
  email: string
  
  @Column({select: false})
  password: string

  @Column({default: 'user'})
  role: IUserRoles

  @Column({default: true})
  active: boolean

  @ManyToOne(() => Company, x => x.createdBy)
  company: Company

  async encryptPassword(pass: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
  }

  async validatePassword(pass: string): Promise<boolean>{
    return await bcrypt.compare(pass, this.password)
  }

}
