import { Injectable } from '@nestjs/common'
import * as passport from 'passport'

@Injectable()
export class AuthService {
  constructor () {
    passport.serializeUser((user, done) => {
      done(null, user)
    })

    passport.deserializeUser((user, done) => {
      // @ts-ignore
      done(null, user)
    })
  }
}
