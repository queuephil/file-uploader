import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client'

const expressSession = session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
  },
  secret: 'a santa at nasa',
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
})

export default expressSession
