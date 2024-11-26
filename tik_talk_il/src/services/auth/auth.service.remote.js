import { httpService } from '../http.service.js'

export const authService = {
    login,
    signup,
    getLoggedInUser,
    logout,
}

async function login(credentials) {
    try {
        const response = await httpService.post('auth/login', {
            email: credentials.email,
            password: credentials.password
        })
        
        // Check if response contains required data
        if (!response.user || !response.idToken) {
            throw new Error('Invalid server response')
        }

        // Store the user and token
        const loggedInUser = { user: response.user, idToken: response.idToken }
        localStorage.setItem('loggedinUser', JSON.stringify(loggedInUser))
        return loggedInUser
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

async function signup(credentials) {
    try {
        const response = await httpService.post('auth/signup', {
            email: credentials.email,
            password: credentials.password,
            fullname: credentials.fullname,
            phone: credentials.phone,
            courseType: credentials.courseType
        })

        // Check if response contains required data
        if (!response.user || !response.idToken) {
            throw new Error('Invalid server response')
        }

        // Store the user and token
        const loggedInUser = { user: response.user, idToken: response.idToken }
        localStorage.setItem('loggedinUser', JSON.stringify(loggedInUser))
        return loggedInUser
    } catch (error) {
        console.error('Signup error:', error)
        throw error
    }
}

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedinUser'))
}

function logout() {
    localStorage.removeItem('loggedinUser')
}
