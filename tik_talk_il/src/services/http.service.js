import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'

export const httpService = {
    async get(endpoint) {
        return ajax(endpoint)
    },
    async post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    async put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    async delete(endpoint) {
        return ajax(endpoint, 'DELETE')
    },
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            data,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                // Add auth token if exists
                ...(sessionStorage.getItem('authToken') && {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }),
            },
            credentials: 'include', // Important for cookies
            ...(data && { body: JSON.stringify(data) }),
        })

        if (!res.ok) {
            const errorText = await res.text()
            console.error('Server error response:', errorText)
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const responseData = await res.json()
        return responseData
    } catch (err) {
        console.error(`Error in HTTP ${method}:`, err)
        throw err
    }
}
