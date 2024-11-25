import { storageService } from "../async-storage.service.js"; 
import { utilService } from "../util.service.js";

const STORAGE_KEY = 'questions';

export const questionService = {
    getquestions,
    getById,
    save,
    remove,
};

async function getquestions() {
    var questions = await storageService.query(STORAGE_KEY);
    if (!questions.length) {
        questions = _createquestions();
        for (const question of questions) {
            await storageService.post(STORAGE_KEY, question);
        }
    }
    return questions;
}

async function getById(questionId) {
    return storageService.get(STORAGE_KEY, questionId)
}

async function save(question) {
    var savedQuestion
    
    if (question._id) {
        savedQuestion = await storageService.put(STORAGE_KEY, question)
    } else {
        savedQuestion = await storageService.post(STORAGE_KEY, question)
    }
    return savedQuestion
}

async function remove(questionId) {
    await storageService.remove(STORAGE_KEY, questionId)
}

function _createquestions() {
    return demoData();
}

function demoData() {
    return [
        {
            _id: utilService.makeId(),
            text: "What is the past tense of 'go'?",
            options: ["goed", "went", "gone", "goes"],
            correctAnswer: "went",
        },
        {
            _id: utilService.makeId(),
            text: "Choose the correct sentence:",
            options: [
                "He are going to school.",
                "He is going to school.",
                "He is go to school.",
            ],
            correctAnswer: "He is going to school.",
        },
        {
            _id: utilService.makeId(),
            text: "What is the synonym of 'happy'?",
            options: ["sad", "joyful", "angry", "upset"],
            correctAnswer: "joyful",
        },
        {
            _id: utilService.makeId(),
            text: "Which of the following is a noun?",
            options: ["run", "quickly", "happiness", "blue"],
            correctAnswer: "happiness",
        },
        {
            _id: utilService.makeId(),
            text: "What is the correct plural form of 'child'?",
            options: ["childs", "childrens", "children", "childes"],
            correctAnswer: "children",
        },
        {
            _id: utilService.makeId(),
            text: "Which word is an adjective?",
            options: ["quick", "run", "happily", "swim"],
            correctAnswer: "quick",
        },
        {
            _id: utilService.makeId(),
            text: "Complete the sentence: 'She _______ to the store every day.'",
            options: ["go", "goes", "gone", "going"],
            correctAnswer: "goes",
        },
        {
            _id: utilService.makeId(),
            text: "What is the correct way to form the past tense of 'study'?",
            options: ["studied", "studys", "studyed", "studieded"],
            correctAnswer: "studied",
        },
    ];
}