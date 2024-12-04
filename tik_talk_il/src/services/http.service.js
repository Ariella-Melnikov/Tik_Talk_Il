import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/'

const axios = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        ...(sessionStorage.getItem('authToken') && {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        })
    }
})

export const httpService = {
    async get(endpoint) {
        try {
            const res = await axios.get(endpoint)
            return res.data
        } catch (err) {
            console.error(`Failed GET request to ${endpoint}:`, err)
            throw err
        }
    },
    async post(endpoint, data) {
        try {
            const res = await axios.post(endpoint, data)
            return res.data
        } catch (err) {
            console.error(`Failed POST request to ${endpoint}:`, err)
            throw err
        }
    },
    async put(endpoint, data) {
        try {
            const res = await axios.put(endpoint, data)
            return res.data
        } catch (err) {
            console.error(`Failed PUT request to ${endpoint}:`, err)
            throw err
        }
    },
    async delete(endpoint, data) {
        try {
            const res = await axios.delete(endpoint, { data })
            return res.data
        } catch (err) {
            console.error(`Failed DELETE request to ${endpoint}:`, err)
            throw err
        }
    }
}
