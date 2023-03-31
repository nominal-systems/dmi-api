import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'

export const orderRepositoryMockFactory: () => Partial<Repository<Order>> = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  // @ts-expect-error: compiler type error
  create: jest.fn<Array<Partial<Order>>, Order[]>((entityLikeArray) => entityLikeArray.map((item) => Object.assign(new Order(), item)))
})
