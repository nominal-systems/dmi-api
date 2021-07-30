import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { User } from './user.entity'
import * as argon2 from 'argon2'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor (connection: Connection) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return User
  }

  async beforeInsert (event: InsertEvent<User>): Promise<void> {
    await this.hashPassword(event)
  }

  async beforeUpdate (event: UpdateEvent<User>): Promise<void> {
    await this.hashPassword(event)
  }

  private async hashPassword (
    event: InsertEvent<User> | UpdateEvent<User>
  ): Promise<void> {
    if (event.entity == null || !(event.entity instanceof User)) return

    const { password } = event.entity

    if (password != null && !password.startsWith('$argon2id$v=')) {
      event.entity.password = await argon2.hash(password, {
        type: argon2.argon2id
      })
    }
  }
}
