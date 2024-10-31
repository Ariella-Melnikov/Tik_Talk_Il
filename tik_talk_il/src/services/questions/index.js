const { VITE_LOCAL, MODE } = import.meta.env;

import { questionService as local } from './questions.service.local';
import { questionService as remote } from './questions.service.remote';

function getEmptyQuestion() {
    return {
        text: "",
        options: [],
        correctAnswer: "",
    };
}

const service = VITE_LOCAL === 'true' ? local : remote;
export const questionService = { getEmptyQuestion, ...service };

// Expose service for debugging in dev mode
if (MODE === 'development') {
    window.questionService = questionService;
}