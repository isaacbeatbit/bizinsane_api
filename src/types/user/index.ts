import { User } from '@prisma/client'

export type SignUp = Pick<
  User,
  'email' | 'password' | 'username' | 'privilege' | 'firstName' | 'lastName'
> & {
  terms: boolean
  sendInfo: boolean
}

export type LogInInput = Pick<User, 'username' | 'password'>

export type Login = Pick<User, 'password' | 'username'> & {
  res: any
}
