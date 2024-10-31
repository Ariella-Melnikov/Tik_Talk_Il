import { remoteService } from '../remote.service.js'
import { httpService } from '../http.service.js'


export const submissionService = {
    submitAdultForm,
    submitKidsForm,
    getAdultSubmissions,
    getKidsSubmissions,
    getSubmissions,
    getById,
    remove,
    save,
    addSubmissionManually,
}

// Submit adult form data
async function submitAdultForm(formData) {
    const response = await httpService.post('/api/submissions/adult', formData)
    return response.data
}

// Submit kids form data
async function submitKidsForm(formData) {
    const response = await httpService.post('/api/submissions/kids', formData)
    return response.data
}

// Get all adult submissions from backend
async function getAdultSubmissions() {
    const response = await httpService.get('/api/submissions/adult')
    return response.data
}

// Get all kids submissions from backend
async function getKidsSubmissions() {
    const response = await httpService.get('/api/submissions/kids')
    return response.data
}

// Get all submissions based on filter (for both adult and kids submissions)
async function getSubmissions(filterBy = { term: '' }) {
    const params = new URLSearchParams(filterBy).toString()
    const response = await httpService.get(`/api/submissions?${params}`)
    return response.data
}

// Get a specific submission by ID and type
async function getById(submissionId, type) {
    const response = await httpService.get(`/api/submissions/${type}/${submissionId}`)
    return response.data
}

// Remove a submission by ID and type
async function remove(submissionId, type) {
    const response = await httpService.delete(`/api/submissions/${type}/${submissionId}`)
    return response.data
}

// Save a submission (add new or update existing)
async function save(submission, type) {
    let response
    if (submission._id) {
        // Update existing submission
        response = await httpService.put(`/api/submissions/${type}/${submission._id}`, submission)
    } else {
        // Add new submission
        response = await httpService.post(`/api/submissions/${type}`, submission)
    }
    return response.data
}

// Manually add a new submission (simulate adding without form submission)
async function addSubmissionManually(submissionData, type) {
    const newSubmission = {
        ...submissionData,
        isSubscribe: false,
        isRead: false,
    }
    const response = await httpService.post(`/api/submissions/${type}`, newSubmission)
    return response.data
}

