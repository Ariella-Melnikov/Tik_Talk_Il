import { submissionService } from '@/services/subbmision'

export default {
    namespaced: true,
    state: {
        adultSubmissions: [],
        kidsSubmissions: [],
    },
    mutations: {
        setAdultSubmissions(state, submissions) {
            state.adultSubmissions = submissions
        },
        setKidsSubmissions(state, submissions) {
            state.kidsSubmissions = submissions
        },
        addAdultSubmission(state, submission) {
            state.adultSubmissions.push(submission)
        },
        addKidsSubmission(state, submission) {
            state.kidsSubmissions.push(submission)
        },
        updateAdultSubmission(state, updatedSubmission) {
            const idx = state.adultSubmissions.findIndex((sub) => sub._id === updatedSubmission._id)
            if (idx !== -1) state.adultSubmissions.splice(idx, 1, updatedSubmission)
        },
        updateKidsSubmission(state, updatedSubmission) {
            const idx = state.kidsSubmissions.findIndex((sub) => sub._id === updatedSubmission._id)
            if (idx !== -1) state.kidsSubmissions.splice(idx, 1, updatedSubmission)
        },
        deleteAdultSubmission(state, submissionId) {
            state.adultSubmissions = state.adultSubmissions.filter((sub) => sub._id !== submissionId)
        },
        deleteKidsSubmission(state, submissionId) {
            state.kidsSubmissions = state.kidsSubmissions.filter((sub) => sub._id !== submissionId)
        },
        markSubmissionAsRead(state, { submissionId, type }) {
            if (type === 'adult') {
                const submission = state.adultSubmissions.find((sub) => sub._id === submissionId)
                if (submission) submission.isRead = !submission.isRead
            } else if (type === 'kids') {
                const submission = state.kidsSubmissions.find((sub) => sub._id === submissionId)
                if (submission) submission.isRead = !submission.isRead
            }
        },
    },

    actions: {
        async loadAdultSubmissions({ commit }) {
            try {
                const submissions = await submissionService.getAdultSubmissions()
                commit('setAdultSubmissions', submissions)
            } catch (err) {
                console.error('Failed to load adult submissions:', err)
            }
        },
        async loadKidsSubmissions({ commit }) {
            try {
                const submissions = await submissionService.getKidsSubmissions()
                commit('setKidsSubmissions', submissions)
            } catch (err) {
                console.error('Failed to load kids submissions:', err)
            }
        },
        async saveSubmission({ commit, state }, { submission, type }) {
            try {
                let savedSubmission
                if (type === 'adult') {
                    // Save adult submission (new or update)
                    savedSubmission = await submissionService.save(submission, 'adult')
                    if (!submission._id) commit('addAdultSubmission', savedSubmission)
                    else commit('updateAdultSubmission', savedSubmission)
                } else if (type === 'kids') {
                    // Save kids submission (new or update)
                    savedSubmission = await submissionService.save(submission, 'kids')
                    if (!submission._id) commit('addKidsSubmission', savedSubmission)
                    else commit('updateKidsSubmission', savedSubmission)
                }
            } catch (err) {
                console.error(`Failed to save ${type} submission:`, err)
            }
        },
        async deleteSubmission({ commit }, { submissionId, type }) {
            try {
                await submissionService.remove(submissionId, type)
                if (type === 'adult') {
                    commit('deleteAdultSubmission', submissionId)
                } else {
                    commit('deleteKidsSubmission', submissionId)
                }
            } catch (err) {
                console.error(`Failed to delete ${type} submission:`, err)
            }
        },
        async toggleSubmissionReadStatus({ commit, state }, { submissionId, type }) {
            try {
                // Find the submission
                const submission =
                    type === 'adult'
                        ? state.adultSubmissions.find((sub) => sub._id === submissionId)
                        : state.kidsSubmissions.find((sub) => sub._id === submissionId)

                if (!submission) throw new Error(`Submission not found for type: ${type} and ID: ${submissionId}`)

                // Toggle the isRead property
                const updatedSubmission = { ...submission, isRead: !submission.isRead }
                await submissionService.save(updatedSubmission, type)

                // Commit the markSubmissionAsRead mutation to update the state
                commit('markSubmissionAsRead', { submissionId, type, isRead: updatedSubmission.isRead })
            } catch (err) {
                console.error(`Failed to toggle read status of ${type} submission:`, err)
            }
        },
    },

    getters: {
        adultSubmissions(state) {
            return state.adultSubmissions
        },
        kidsSubmissions(state) {
            return state.kidsSubmissions
        },
        getEmptySubmission: () => () => {
            return submissionService.getEmptySubmission()
        },
    },
}
