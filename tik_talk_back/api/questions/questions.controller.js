import { questionService } from './questions.service.js';
import { logger } from '../../services/logger.service.js';

export async function getQuestions(req, res) {
    try {
        const questions = await questionService.query()
        res.json(questions) // Make sure we're sending JSON
    } catch (err) {
        console.error('Failed to fetch questions:', err)
        res.status(500).json({ error: 'Failed to fetch questions' })
    }
}

export async function getQuestionById(req, res) {
    try {
        const { id } = req.params;
        const question = await questionService.getById(id);
        res.json(question);
    } catch (err) {
        logger.error('Failed to fetch question', err);
        res.status(500).send({ err: 'Failed to fetch question' });
    }
}

export async function addQuestion(req, res) {
    try {
        const question = req.body;
        const addedQuestion = await questionService.add(question);
        res.json(addedQuestion);
    } catch (err) {
        logger.error('Failed to add question', err);
        res.status(500).send({ err: 'Failed to add question' });
    }
}

export async function updateQuestion(req, res) {
    try {
        const { id } = req.params;
        const question = req.body;
        const updatedQuestion = await questionService.update(id, question);
        res.json(updatedQuestion);
    } catch (err) {
        logger.error('Failed to update question', err);
        res.status(500).send({ err: 'Failed to update question' });
    }
}

export async function deleteQuestion(req, res) {
    try {
        console.log('User requesting delete:', req.user);
        const { id } = req.params;
        await questionService.remove(id);
        res.send({ msg: 'Question deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete question', err);
        res.status(500).send({ err: 'Failed to delete question' });
    }
}