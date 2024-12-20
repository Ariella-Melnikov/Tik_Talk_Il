import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

import { getUser, getUsers, deleteUser, updateUser } from './user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', requireAuth, updateUser)
router.delete('/:id', requireAuth, deleteUser)


export const userRoutes = router