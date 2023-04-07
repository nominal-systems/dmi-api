import { Repository } from 'typeorm'
import { Report } from '../entities/report.entity'

export const reportRepositoryMockFactory: () => Partial<Repository<Report>> = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  // @ts-expect-error: compiler type error
  create: jest.fn<Array<Partial<Report>>, Report[]>((entityLikeArray) => entityLikeArray.map((item) => Object.assign(new Report(), item))),
  createQueryBuilder: jest.fn()
})
