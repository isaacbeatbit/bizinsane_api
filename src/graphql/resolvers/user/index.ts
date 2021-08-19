import { PrismaClient } from '@prisma/client'
import { createToken } from '../../../lib/CRUD/user/login'
import { signUp } from '../../../lib/CRUD/user/signUp'
import { LogInInput, SignUp } from '../../../types/user'

const prisma = new PrismaClient()

export default {
  Query: {
    users: async (parent: any, args: any, context: any, info: any) => {
      return await prisma.user.findMany()
    }
  },
  Mutation: {
    signUp: async (
      parent: any,
      { input }: { input: SignUp },
      context: any,
      info: any
    ) => {
      const user = await signUp({ input })

      return user
    },
    deleteUser: async (
      parent: any,
      { id }: { id: string },
      context: any,
      info: any
    ): Promise<boolean> => {
      await prisma.user.delete({ where: { id } })

      return true
    },
    logIn: async (
      parent: any,
      { input }: { input: LogInInput },
      { res }: { res: any },
      info: any
    ) => {
      await createToken({
        res,
        password: input.password,
        username: input.username
      })

      return true
    }
  }
}
