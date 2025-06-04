import { Repository } from 'typeorm'
import { Report } from '../entities/report.entity'

export const reportRepositoryMockFactory: () => Partial<Repository<Report>> = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  create: jest.fn((entityLikeArray: Partial<Report>[]) =>
    (entityLikeArray as any).map((item) => Object.assign(new Report(), item))
  ),
  // @ts-expect-error: compiler type error
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([])
  }))
})
