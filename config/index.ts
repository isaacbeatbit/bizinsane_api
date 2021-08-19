import dotenv from 'dotenv'

dotenv.config()

export const { PORT = '', SECRET_KEY = '', EXPIRES_IN = '' } = process.env
