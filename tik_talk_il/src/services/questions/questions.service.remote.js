import { httpService } from '../http.service.js'

export const questionService = {
    async getQuestions() {
        try {
            const questions = await httpService.get('questions')
            // Ensure each question has the correct structure
            return questions.map((q) => ({
                _id: q.id || q._id, // Handle both Firebase and MongoDB IDs
                text: q.text,
                options: q.options || [],
                correctAnswer: q.correctAnswer,
            }))
        } catch (error) {
            console.error('Error fetching questions:', error)
            throw error
        }
    },

    async getById(questionId) {
        try {
            return await httpService.get(`questions/${questionId}`)
        } catch (error) {
            console.error('Error fetching question by id:', error)
            throw error
        }
    },

    async save(question) {
        try {
            if (question._id) {
                return await httpService.put(`questions/${question._id}`, question)
            } else {
                return await httpService.post('questions', question)
            }
        } catch (error) {
            console.error('Error saving question:', error)
            throw error
        }
    },

    async remove(questionId) {
        try {
            return await httpService.delete(`questions/${questionId}`)
        } catch (error) {
            console.error('Error removing question:', error)
            throw error
        }
    },
}
