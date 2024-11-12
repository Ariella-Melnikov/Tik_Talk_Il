import express from 'express'

import { login, signup, logout, addAdminUser } from './auth.controller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)



if (process.env.ALLOW_ADMIN_CREATION === "true") {
    router.post('/add-admin', requireAdmin, addAdminUser);
}
export const authRoutes = router
