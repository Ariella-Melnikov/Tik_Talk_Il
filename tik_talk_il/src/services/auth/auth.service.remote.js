import { httpService } from '../http.service.js'

export const authService = {
    login,
    signup,
    getLoggedInUser,
    logout,
}

async function login(credentials) {
    const response = await httpService.post('/api/auth/login', credentials)

    // Store the user and ID token in localStorage
    const { user, idToken } = response
    const loggedInUser = { ...user, idToken }
    localStorage.setItem('loggedinUser', JSON.stringify(loggedInUser))
    return loggedInUser
}

async function signup(user) {
    const response = await httpService.post('/api/auth/signup', user)

    // Store the user and ID token in localStorage
    const { user: newUser, idToken } = response
    const loggedInUser = { ...newUser, idToken }
    localStorage.setItem('loggedinUser', JSON.stringify(loggedInUser))
    return loggedInUser
}

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedinUser'))
}

function logout() {
    localStorage.removeItem('loggedinUser')
}
