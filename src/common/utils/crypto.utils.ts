import { InternalServerErrorException } from '@nestjs/common'
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'
import { Hash } from '../typings/hash.interface'
import { isJson, isObject, isString } from './shared.utils'

export interface EncryptedProviderConfigAndIntegrationOptsArgs {
  providerConfigurationOptions?: any
  integrationOptions?: any
  secretKey: string
}

export interface DecryptedProviderConfigAndIntegrationOpts {
  providerConfigurationOptions?: string | Record<string, unknown>
  integrationOptions?: string | Record<string, unknown>
}

const algorithm = 'aes-256-ctr'

export function encrypt (textToEncrypt: any, secretKey: string): Hash {
  const iv = randomBytes(16)
  const cipher = createCipheriv(algorithm, secretKey, iv)

  if (!isString(textToEncrypt)) {
    if (isObject(textToEncrypt)) {
      textToEncrypt = JSON.stringify(textToEncrypt)
    } else {
      throw new InternalServerErrorException()
    }
  }

  const encrypted = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final()
  ])

  const encryptedObject = {
    iv: iv.toString('hex'),
    data: encrypted.toString('hex')
  }

  return encryptedObject
}

export function decrypt (hash: Hash, secretKey: string): string {
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  )

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.data, 'hex')),
    decipher.final()
  ])

  let decryptedText = decrpyted.toString()

  if (isJson(decryptedText)) {
    decryptedText = JSON.parse(decryptedText)
  }

  return decryptedText
}
