import express from 'express'
import { getQuestions, getQuestionById, addQuestion, updateQuestion, deleteQuestion } from './questions.controller.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/', getQuestions) 
router.get('/:id', getQuestionById) 
router.post('/', requireAdmin, requireAuth, addQuestion)
router.put('/:id', requireAdmin, requireAuth,updateQuestion) 
router.delete('/:id',requireAuth, requireAdmin, deleteQuestion) 

export const questionRoutes = router
