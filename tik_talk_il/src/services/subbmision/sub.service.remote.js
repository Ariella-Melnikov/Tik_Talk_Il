import { httpService } from '../http.service.js'

export const submissionService = {
    async getAdultSubmissions() {
        try {
            const response = await httpService.get('submissions/adult') // Note: plural 'submissions'
            return response
        } catch (error) {
            console.error('Error fetching adult submissions:', error)
            throw error
        }
    },

    async getKidsSubmissions() {
        try {
            const response = await httpService.get('submissions/kids') // Note: plural 'submissions'
            return response
        } catch (error) {
            console.error('Error fetching kids submissions:', error)
            throw error
        }
    },

    async getById(submissionId, type) {
        try {
            return await httpService.get(`submission/${type}/${submissionId}`)
        } catch (error) {
            console.error('Error fetching submission by id:', error)
            throw error
        }
    },

    async save(submission, type) {
        try {
            if (submission._id) {
                return await httpService.put(`submission/${type}/${submission._id}`, submission)
            } else {
                return await httpService.post(`submission/${type}`, submission)
            }
        } catch (error) {
            console.error('Error saving submission:', error)
            throw error
        }
    },

    async remove(submissionId, type) {
        try {
            return await httpService.delete(`submission/${type}/${submissionId}`)
        } catch (error) {
            console.error('Error removing submission:', error)
            throw error
        }
    },

    async addSubmissionManually(submissionData, type) {
        try {
            const newSubmission = {
                ...submissionData,
                isSubscribe: false,
                isRead: false,
            }
            const response = await httpService.post(`submission/${type}`, newSubmission)
            console.log('Manually added submission:', response)
            return response
        } catch (error) {
            console.error('Error adding submission manually:', error)
            throw error
        }
    },
}
