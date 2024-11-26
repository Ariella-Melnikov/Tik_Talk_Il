import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'

export const httpService = {
    async get(endpoint) {
        try {
            const fullUrl = `${BASE_URL}${endpoint}`

            const res = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            return data
        } catch (err) {
            console.error('Error in HTTP get:', err)
            throw err
        }
    },

    async post(endpoint, data) {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            return await res.json()
        } catch (err) {
            console.error('Error in HTTP post:', err)
            throw err
        }
    },

    async put(endpoint, data) {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            return await res.json()
        } catch (err) {
            console.error('Error in HTTP put:', err)
            throw err
        }
    },

    async delete(endpoint) {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            return await res.json()
        } catch (err) {
            console.error('Error in HTTP delete:', err)
            throw err
        }
    },
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header if you have it
                // 'Authorization': `Bearer ${yourAuthToken}`
            },
            body: method !== 'GET' ? JSON.stringify(data) : null,
        })
        const json = await res.json()
        return json
    } catch (err) {
        console.error(`Had issues ${method}ing to server`, err)
        throw err
    }
}
