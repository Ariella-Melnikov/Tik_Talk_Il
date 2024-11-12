import { authService } from '../api/auth/auth.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export async function setupAsyncLocalStorage(req, res, next) {
    asyncLocalStorage.run(new Map(), () => {
        if (!req.cookies?.loginToken) {
            console.log('No loginToken in cookies.')
            return next()
        }

		const loggedinUser = authService.validateToken(req.cookies.loginToken);
		if (loggedinUser) {
		  const alsStore = asyncLocalStorage.getStore();
		  alsStore.set('loggedinUser', loggedinUser);
		  console.log('Stored loggedinUser in ALS:', loggedinUser);
		} else {
		  console.log('Invalid loginToken provided.');
		}
        next()
    })
    // const storage = {}

    // asyncLocalStorage.run(storage, () => {
    // 	if (!req.cookies?.loginToken) return next()
    // 	const loggedinUser = authService.validateToken(req.cookies.loginToken)

    // 	if (loggedinUser) {
    // 		const alsStore = asyncLocalStorage.getStore()
    // 		alsStore.loggedinUser = loggedinUser
    // 	}
    // 	next()
    // })
}
