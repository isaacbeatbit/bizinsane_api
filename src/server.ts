import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PORT } from '../config'
import cors from 'cors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import { PrismaClient } from '@prisma/client'
import { getTokenData } from './lib/CRUD/user/getTokenData'
import cookieParser from 'cookie-parser'

interface Context {
  prisma: PrismaClient
  req: any
  res: any
  userPayload: any
}

const prisma = new PrismaClient()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

async function main() {
  const app = express()

  app.use(cookieParser())

  app.use(
    cors({
      credentials: true,
      origin: ['https://studio.apollographql.com', 'http://localhost:3000']
    })
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }): Promise<Context> => {
      const token = req.cookies.token || ''

      const userPayload = getTokenData(token)

      return {
        req,
        res,
        prisma,
        userPayload
      }
    }
  })

  await server.start()

  server.applyMiddleware({ app, path: '/', cors: false })

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready in http://localhost:${PORT}`)
  })
}

main()
