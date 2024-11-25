import { authService } from '../api/auth/auth.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export async function setupAsyncLocalStorage(req, res, next) {
    asyncLocalStorage.run(new Map(), async () => {
        let token = req.cookies?.loginToken // Check cookies for token

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split('Bearer ')[1] // Check Authorization header
        }

        if (!token) {
            console.log('No loginToken provided.')
            return next()
        }

        try {
            const loggedInUser = await authService.validateToken(token)
            if (loggedInUser) {
                const alsStore = asyncLocalStorage.getStore()
                alsStore.set('loggedinUser', loggedInUser)
                console.log('Stored loggedinUser in ALS:', loggedInUser)
            }
        } catch (err) {
            console.error('Failed to validate token:', err.message)
        }

        next()
    })
}
