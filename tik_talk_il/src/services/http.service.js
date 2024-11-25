import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },
}

async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`
    const params = method === 'GET' ? data : null

    // Retrieve ID token from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedinUser'))
    const idToken = loggedInUser?.idToken

    // Add Authorization header if ID token exists
    const headers = {}
    if (idToken) {
        headers.Authorization = `Bearer ${idToken}`
    }

    const options = {
        url,
        method,
        data,
        params,
        headers,
    }

    try {
        const res = await axios(options)
        return res.data
    } catch (err) {
        console.error(`Had issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)

        // Handle unauthorized errors
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }

        throw err
    }
}
