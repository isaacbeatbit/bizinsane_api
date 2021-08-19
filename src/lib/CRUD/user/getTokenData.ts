import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config'

type TokenData = {
  token: string
}

export function getTokenData({ token }: TokenData) {
  try {
    if (token) {
      return jwt.verify(token, SECRET_KEY)
    }
  } catch (e) {
    throw new Error(e)
  }
}
