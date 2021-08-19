import bcrypt from 'bcrypt'

const saltRounds = 10

export async function createPassword({ password }: { password: string }) {
  const salt = await bcrypt.genSalt(saltRounds)

  const hash = await bcrypt.hash(password, salt)

  return hash
}

export async function matchPassword({
  password,
  hash
}: {
  password: string
  hash: string
}): Promise<boolean> {
  const match = await bcrypt.compare(password, hash)

  return match
}
