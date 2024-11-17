import { httpService } from '../http.service.js'

export const userService = {
    getUsers,
    getById,
    save,
    remove,
}

// Fetch all users
async function getUsers(filterBy = {}) {
    const params = new URLSearchParams(filterBy).toString()
    return httpService.get(`/api/users?${params}`)
}

// Fetch a user by ID
async function getById(userId) {
    return httpService.get(`/api/users/${userId}`)
}

// Save a new user or update an existing one
async function save(user) {
    if (user._id) {
        return httpService.put(`/api/users/${user._id}`, user)
    } else {
        return httpService.post('/api/users', user)
    }
}

// Delete a user by ID
async function remove(userId) {
    return httpService.delete(`/api/users/${userId}`)
}
