import { httpService } from '../http.service.js'

export const authService = {
    login,
    signup,
    getLoggedInUser,
    logout,
}

async function login(credentials) {
    const user = await httpService.post('/api/auth/login', credentials)
    localStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function signup(user) {
    const newUser = await httpService.post('/api/auth/signup', user)
    localStorage.setItem('loggedinUser', JSON.stringify(newUser))
    return newUser
}

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedinUser'))
}

function logout() {
    localStorage.removeItem('loggedinUser')
}
