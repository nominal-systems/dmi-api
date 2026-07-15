import { Test, TestingModule } from '@nestjs/testing'
import { getDataSourceToken } from '@nestjs/typeorm'
import { NamedLockService, orderLockKey } from './named-lock.service'

describe('NamedLockService', () => {
  let namedLockService: NamedLockService

  const queryRunnerMock = {
    query: jest.fn(),
    release: jest.fn()
  }
  const dataSourceMock = {
    options: { type: 'mysql' },
    createQueryRunner: jest.fn(() => queryRunnerMock)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NamedLockService,
        {
          provide: getDataSourceToken(),
          useValue: dataSourceMock
        }
      ]
    }).compile()

    namedLockService = module.get<NamedLockService>(NamedLockService)
    jest.clearAllMocks()
    dataSourceMock.options.type = 'mysql'
  })

  it('should be defined', () => {
    expect(namedLockService).toBeDefined()
  })

  describe('orderLockKey()', () => {
    it('should build the same key for the same (integrationId, externalId) pair', () => {
      expect(orderLockKey('integration-1', 'EXT-1')).toEqual('order:integration-1:EXT-1')
    })
  })

  describe('withLock()', () => {
    it('should acquire and release the lock on the same query runner around fn', async () => {
      queryRunnerMock.query.mockResolvedValueOnce([{ acquired: 1 }])
      const fn = jest.fn().mockResolvedValue('result')

      const result = await namedLockService.withLock('key-1', fn)

      expect(result).toEqual('result')
      expect(fn).toHaveBeenCalled()
      expect(queryRunnerMock.query).toHaveBeenNthCalledWith(
        1,
        'SELECT GET_LOCK(MD5(?), ?) AS acquired',
        ['key-1', expect.any(Number)]
      )
      expect(queryRunnerMock.query).toHaveBeenNthCalledWith(
        2,
        'SELECT RELEASE_LOCK(MD5(?))',
        ['key-1']
      )
      expect(queryRunnerMock.release).toHaveBeenCalled()
    })

    it('should run fn anyway when the lock wait times out', async () => {
      queryRunnerMock.query.mockResolvedValueOnce([{ acquired: 0 }])
      const fn = jest.fn().mockResolvedValue('result')

      const result = await namedLockService.withLock('key-1', fn)

      expect(result).toEqual('result')
      expect(fn).toHaveBeenCalled()
      // No RELEASE_LOCK for a lock that was never acquired
      expect(queryRunnerMock.query).toHaveBeenCalledTimes(1)
      expect(queryRunnerMock.release).toHaveBeenCalled()
    })

    it('should run fn anyway when acquiring the lock errors', async () => {
      queryRunnerMock.query.mockRejectedValueOnce(new Error('connection lost'))
      const fn = jest.fn().mockResolvedValue('result')

      const result = await namedLockService.withLock('key-1', fn)

      expect(result).toEqual('result')
      expect(fn).toHaveBeenCalled()
      expect(queryRunnerMock.release).toHaveBeenCalled()
    })

    it('should release the lock and the query runner when fn throws', async () => {
      queryRunnerMock.query.mockResolvedValueOnce([{ acquired: 1 }])
      const fn = jest.fn().mockRejectedValue(new Error('boom'))

      await expect(namedLockService.withLock('key-1', fn)).rejects.toThrow('boom')

      expect(queryRunnerMock.query).toHaveBeenNthCalledWith(
        2,
        'SELECT RELEASE_LOCK(MD5(?))',
        ['key-1']
      )
      expect(queryRunnerMock.release).toHaveBeenCalled()
    })

    it('should skip locking on non-MySQL drivers', async () => {
      dataSourceMock.options.type = 'sqlite'
      const fn = jest.fn().mockResolvedValue('result')

      const result = await namedLockService.withLock('key-1', fn)

      expect(result).toEqual('result')
      expect(dataSourceMock.createQueryRunner).not.toHaveBeenCalled()
    })
  })
})
