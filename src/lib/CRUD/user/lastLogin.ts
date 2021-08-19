import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function timeNow() {
  return new Date().toISOString()
}

export async function updateLastLogin({ id }: { id: string }) {
  await prisma.user.update({
    where: { id },
    data: { lastLogin: timeNow() }
  })
}
