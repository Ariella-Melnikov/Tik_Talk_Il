import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'

const USER_STORAGE_KEY = 'users'

export const authService = {
    login,
    signup,
    getLoggedInUser,
    logout,
}

async function login(credentials) {
    const users = await storageService.query(USER_STORAGE_KEY)
    const user = users.find((user) => user.email === credentials.email && user.password === credentials.password)

    if (!user) throw new Error('Invalid email or password')
    storageService.save('loggedinUser', user)
    return user
}

async function signup(user) {
    const users = await storageService.query(USER_STORAGE_KEY)
    const exists = users.some((existingUser) => existingUser.email === user.email)

    if (exists) throw new Error('Email already in use')
    user._id = utilService.makeId()
    await storageService.post(USER_STORAGE_KEY, user)
    storageService.save('loggedinUser', user)
    return user
}

function getLoggedInUser() {
    return storageService.load('loggedinUser')
}

function logout() {
    storageService.remove('loggedinUser')
}
