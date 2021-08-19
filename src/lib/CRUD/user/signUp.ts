import { PrismaClient } from '@prisma/client'
import { SignUp } from '../../../types/user'
import { createPassword } from './password'
import { verifyEmail, verifyUsername } from './validations'

const prisma = new PrismaClient()

export async function signUp({ input }: { input: SignUp }): Promise<any> {
  const isEmailValid = await verifyEmail(input.email)
  const isUsernameValid = await verifyUsername(input.username)

  const hashedPassword = await createPassword({ password: input.password })

  console.log('The user accept the TERMS:', input.terms)

  console.log('The user want to recibe info by email', input.sendInfo)

  const user = await prisma.user.create({
    data: {
      email: isEmailValid,
      username: isUsernameValid,
      password: hashedPassword,
      privilege: input.privilege,
      lastName: input.lastName,
      firstName: input.firstName
    }
  })

  return user
}
