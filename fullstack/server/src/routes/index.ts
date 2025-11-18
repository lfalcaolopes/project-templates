import { Router } from 'express'
import { pool } from '../config/db'

export const routes = Router()

// import { prisma } from '../config/prisma'

// routes.get('/user', async (_req, res, next) => {
//   try {
//     const users = await prisma.user.findMany()
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

routes.get('/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() })
})

routes.get('/error', (_req, _res) => {
  throw new Error('This is a test error')
})
routes.get('/api/ping', async (_req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW() as now')
    res.json({ ok: true, now: result.rows[0].now })
  } catch (err) {
    next(err)
  }
})
