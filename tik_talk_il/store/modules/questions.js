import { questionService } from "@/services/questions";

export default {
    namespaced: true,
    state: {
        questions: []
    },
    mutations: {
        setQuestions(state, questions) {
            state.questions = questions;
        },
        addQuestion(state, question) {
            state.questions.push(question);
        },
        updateQuestion(state, updatedQuestion) {
            const idx = state.questions.findIndex(q => q._id === updatedQuestion._id);
            if (idx !== -1) state.questions.splice(idx, 1, updatedQuestion);
        },
        deleteQuestion(state, questionId) {
            state.questions = state.questions.filter(q => q._id !== questionId);
        }
    },
    actions: {
        async loadQuestions({ commit }) {
            try {
                const questions = await questionService.getQuestions()
                commit('setQuestions', questions)
            } catch (err) {
                console.error('Failed to load questions:', err)
                throw err
            }
        },
        async saveQuestion({ commit }, question) {
            try {
                const savedQuestion = await questionService.save(question);
                if (!question._id) commit('addQuestion', savedQuestion);
                else commit('updateQuestion', savedQuestion);
            } catch (err) {
                console.error('Failed to save question:', err);
            }
        },
        async deleteQuestion({ commit }, questionId) {
            try {
                await questionService.remove(questionId);
                commit('deleteQuestion', questionId);
            } catch (err) {
                console.error('Failed to delete question:', err);
            }
        }
    },
    getters: {
        questions(state) {
            return state.questions;
        },
        getEmptyQuestion: () => () => {
            return questionService.getEmptyQuestion();
        }
    }
};