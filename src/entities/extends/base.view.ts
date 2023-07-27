import { instanceToPlain } from 'class-transformer'
import { BaseEntity as _BaseEntity } from 'typeorm'

export abstract class BaseView extends _BaseEntity {
	toJSON() {
		return instanceToPlain(this)
	}
}
