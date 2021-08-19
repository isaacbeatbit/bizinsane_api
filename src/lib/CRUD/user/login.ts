import { User } from '@prisma/client'
import { AuthenticationError } from 'apollo-server-express'
import { EXPIRES_IN, SECRET_KEY } from '../../../../config'
import { matchPassword } from './password'
import { getUser } from './getUser'
import { updateLastLogin } from './lastLogin'
import jwt from 'jsonwebtoken'
import { Login } from '../../../types/user'

export async function createToken({ res, username, password }: Login) {
  const user = await getUser({ username })

  if (!user) {
    throw new AuthenticationError('Credenciales incorrectas')
  }

  const match = await matchPassword({ hash: user.password, password })

  if (!match) {
    throw new AuthenticationError('Credenciales incorrectas')
  }

  await updateLastLogin({ id: user.id })

  const {
    active,
    username: userName,
    isVerified,
    privilege,
    avatar,
    lastName,
    firstName
  }: User = user

  const token = jwt.sign(
    {
      active,
      username: userName,
      isVerified,
      privilege,
      avatar,
      lastName,
      firstName
    },
    SECRET_KEY,
    { expiresIn: EXPIRES_IN }
  )

  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' })
}
