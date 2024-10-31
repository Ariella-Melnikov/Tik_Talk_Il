import { httpService } from '../http.service.js';

export const questionService = {
    getQuestions,
    getById,
    save,
    remove,
};

// Fetch questions from the backend
async function getQuestions() {
    const response = await httpService.get('/api/questions');
    return response;
}

// Fetch a specific question by ID from the backend
async function getById(questionId) {
    const response = await httpService.get(`/api/questions/${questionId}`);
    return response;
}

// Save a question (add new or update existing) to the backend
async function save(question) {
    if (question._id) {
        return await httpService.put(`/api/questions/${question._id}`, question);
    } else {
        return await httpService.post('/api/questions', question);
    }
}

// Delete a question by ID from the backend
async function remove(questionId) {
    return await httpService.delete(`/api/questions/${questionId}`);
}