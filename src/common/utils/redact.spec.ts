import { Types } from 'mongoose'
import { redactHeaders, redactObject, redactPayload, redactUrl } from './redact'

describe('redactHeaders()', () => {
  it('should mask credential headers whatever their case and leave the others as they are', () => {
    expect(redactHeaders({
      Authorization: 'Bearer dummy-token',
      'Proxy-Authorization': 'Basic dummy',
      Cookie: 'session=dummy',
      'set-cookie': ['session=dummy; HttpOnly'],
      'X-API-KEY': 'dummy-key',
      'X-Auth-Token': 'dummy-token',
      'X-Client-Secret': 'dummy-secret',
      'X-Password': 'dummy-password',
      'X-ApiKey': 'dummy-key',
      'Ocp-Apim-Subscription-Api-Key': 'dummy-key',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Length': '0'
    })).toEqual({
      Authorization: '***',
      'Proxy-Authorization': '***',
      Cookie: '***',
      'set-cookie': '***',
      'X-API-KEY': '***',
      'X-Auth-Token': '***',
      'X-Client-Secret': '***',
      'X-Password': '***',
      'X-ApiKey': '***',
      'Ocp-Apim-Subscription-Api-Key': '***',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Length': '0'
    })
  })

  it('should not mutate its input', () => {
    const headers = { Authorization: 'Bearer dummy-token', Accept: 'application/json' }

    const redacted = redactHeaders(headers)

    expect(headers).toEqual({ Authorization: 'Bearer dummy-token', Accept: 'application/json' })
    expect(redacted).not.toBe(headers)
  })

  it('should return anything that is not a header object as it is', () => {
    expect(redactHeaders(undefined)).toBeUndefined()
    expect(redactHeaders(null)).toBeNull()
    expect(redactHeaders('Authorization: Bearer dummy-token')).toEqual('Authorization: Bearer dummy-token')
  })
})

describe('redactObject()', () => {
  it('should mask credential keys at any depth, arrays included', () => {
    expect(redactObject({
      access_token: 'dummy-access',
      refresh_token: 'dummy-refresh',
      expires_in: 3600,
      user: { name: 'u', Password: 'dummy-password', pass: 'p', pwd: 'p', passenger: 'kept' },
      clients: [{ id: 1, client_secret: 'dummy-secret' }, { id: 2, Token: 'dummy-token' }],
      settings: { apiKey: 'k', api_key: 'k', 'api-key': 'k', authorization: 'Bearer dummy' }
    })).toEqual({
      access_token: '***',
      refresh_token: '***',
      expires_in: 3600,
      user: { name: 'u', Password: '***', pass: '***', pwd: '***', passenger: 'kept' },
      clients: [{ id: 1, client_secret: '***' }, { id: 2, Token: '***' }],
      settings: { apiKey: '***', api_key: '***', 'api-key': '***', authorization: '***' }
    })
  })

  it('should mask a dotted key whose segment is pass or pwd, which nestKeys() would otherwise expose', () => {
    expect(redactObject({ 'login.pass': 'p', 'login.pwd': 'p', 'login.name': 'u' }))
      .toEqual({ 'login.pass': '***', 'login.pwd': '***', 'login.name': 'u' })
  })

  it('should not mutate its input', () => {
    const body = { data: { access_token: 'dummy-access' }, items: [{ password: 'dummy-password' }] }

    redactObject(body)

    expect(body).toEqual({ data: { access_token: 'dummy-access' }, items: [{ password: 'dummy-password' }] })
  })

  it('should return primitives, null, undefined and non-plain objects as they are', () => {
    const buffer = Buffer.from('password=dummy')
    const date = new Date('2026-01-01T00:00:00.000Z')
    const objectId = new Types.ObjectId()

    expect(redactObject('password=dummy')).toEqual('password=dummy')
    expect(redactObject(42)).toEqual(42)
    expect(redactObject(null)).toBeNull()
    expect(redactObject(undefined)).toBeUndefined()
    expect(redactObject(buffer)).toBe(buffer)
    expect(redactObject(date)).toBe(date)
    expect(redactObject(objectId)).toBe(objectId)
    expect(redactObject({ at: date, id: objectId })).toEqual({ at: date, id: objectId })
  })

  it('should stop at a cycle without mistaking a shared value for one', () => {
    const cyclic: any = { name: 'n', password: 'dummy-password' }
    cyclic.self = cyclic
    const shared = { token: 'dummy-token', id: 1 }

    expect(redactObject(cyclic)).toEqual({ name: 'n', password: '***', self: '[Circular]' })
    expect(redactObject({ a: shared, b: shared })).toEqual({ a: { token: '***', id: 1 }, b: { token: '***', id: 1 } })
  })
})

describe('redactPayload()', () => {
  it('should mask the password in a form-encoded payload and keep the other pairs byte for byte', () => {
    expect(redactPayload('grant_type=password&username=u&password=p'))
      .toEqual('grant_type=password&username=u&password=***')
    // api%5Fkey only matches once decoded to api_key
    expect(redactPayload('scope=read+write&api%5Fkey=k%3D%3D&redirect_uri=https%3A%2F%2Fexample.test%2F'))
      .toEqual('scope=read+write&api%5Fkey=***&redirect_uri=https%3A%2F%2Fexample.test%2F')
  })

  it('should mask a nested access_token in a JSON string payload', () => {
    const payload = JSON.stringify({ data: { access_token: 'dummy-access', expires_in: 3600 }, user: 'u' })

    expect(JSON.parse(redactPayload(payload)))
      .toEqual({ data: { access_token: '***', expires_in: 3600 }, user: 'u' })
  })

  it('should return a JSON string without credentials byte for byte', () => {
    const payload = '{ "ClinicID": "123456",  "Accessions": [ "A1" ] }'

    expect(redactPayload(payload)).toBe(payload)
  })

  it('should return a plain string without credentials unchanged', () => {
    expect(redactPayload('hello world')).toEqual('hello world')
    const xml = '<?xml version="1.0"?><Request><ClinicID>123456</ClinicID></Request>'
    expect(redactPayload(xml)).toEqual(xml)
  })

  it('should mask an object payload like any other object, without mutating it', () => {
    const payload = { UserName: 'USER', Password: 'dummy-password', ClinicID: '123456' }

    expect(redactPayload(payload)).toEqual({ UserName: 'USER', Password: '***', ClinicID: '123456' })
    expect(payload).toEqual({ UserName: 'USER', Password: 'dummy-password', ClinicID: '123456' })
  })
})

describe('redactUrl()', () => {
  it('should mask accesstoken in the query and keep the path and the other pairs byte for byte', () => {
    expect(redactUrl('https://vendor.example.test/api/Tests/v6?accesstoken=abc&userId=1&pageSize=2500'))
      .toEqual('https://vendor.example.test/api/Tests/v6?accesstoken=***&userId=1&pageSize=2500')
  })

  it('should mask accessToken and signature whatever their case', () => {
    expect(redactUrl('https://vendor.example.test/api/results?accessToken=abc&Signature=s1&clinicId=1'))
      .toEqual('https://vendor.example.test/api/results?accessToken=***&Signature=***&clinicId=1')
  })

  it('should return a URL without a query as the same string', () => {
    const url = 'https://vendor.example.test/oauth/token'

    expect(redactUrl(url)).toBe(url)
  })

  it('should return a URL whose query has no credential byte for byte', () => {
    const url = 'https://vendor.example.test/api/orders?status=final&from=2026-09-01T00%3A00%3A00Z&q=a+b'

    expect(redactUrl(url)).toBe(url)
  })

  it('should mask a credential in a decoded query whose values contain spaces', () => {
    expect(redactUrl('https://vendor.example.test/api/search?access_token=abc&q=hello world'))
      .toEqual('https://vendor.example.test/api/search?access_token=***&q=hello world')
  })

  it('should leave the fragment as it is', () => {
    expect(redactUrl('https://vendor.example.test/app?token=abc#/results?view=full&token=kept'))
      .toEqual('https://vendor.example.test/app?token=***#/results?view=full&token=kept')
  })

  it('should return anything that is not a string as it is', () => {
    expect(redactUrl(undefined)).toBeUndefined()
    expect(redactUrl(null)).toBeNull()
  })
})
