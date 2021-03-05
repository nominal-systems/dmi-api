import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'
import { User } from './user.entity'
import * as argon2 from 'argon2'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor (connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return User
  }

  async beforeInsert (event: InsertEvent<User>) {
    await this.hashPassword(event)
  }

  async beforeUpdate (event: UpdateEvent<User>) {
    await this.hashPassword(event)
  }

  private async hashPassword (event: InsertEvent<User>) {
    if (event.entity.password && !event.entity.password.startsWith('$argon2id$v=')) {
      event.entity.password = await argon2.hash(event.entity.password, {
        type: argon2.argon2id,
      })
    }
  }
}
