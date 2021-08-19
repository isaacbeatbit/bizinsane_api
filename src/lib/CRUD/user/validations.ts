import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'

const prisma = new PrismaClient()

enum UserParams {
  email = 'email',
  username = 'username'
}

type UserParam = UserParams.email | UserParams.username

function credentialAlreadyRegisteredErrorMessage(userParam: UserParam) {
  return `This ${userParam} is alredy registered, please try another`
}

export async function verifyEmail(email: string): Promise<string> {
  const emailExists = await prisma.user.findUnique({ where: { email } })

  if (emailExists) {
    throw new ApolloError(
      credentialAlreadyRegisteredErrorMessage(UserParams.email)
    )
  }

  return email
}

export async function verifyUsername(username: string): Promise<string> {
  const usernameExists = await prisma.user.findUnique({ where: { username } })

  if (usernameExists) {
    throw new ApolloError(
      credentialAlreadyRegisteredErrorMessage(UserParams.username)
    )
  }

  return username
}
