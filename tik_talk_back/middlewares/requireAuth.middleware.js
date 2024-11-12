import { config } from '../config/index.js'
import { logger } from '../services/logger.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export function requireAuth(req, res, next) {
    // const { loggedinUser } = asyncLocalStorage.getStore()
    // req.loggedinUser = loggedinUser
    const alsStore = asyncLocalStorage.getStore()
    const loggedinUser = alsStore?.get('loggedinUser')

	if (!loggedinUser) {
		console.log('Authentication failed: No loggedinUser found in ALS store.');
		return res.status(401).send({ err: 'Not Authenticated' });
	  }

	  console.log('Authenticated user:', loggedinUser);
	  req.loggedinUser = loggedinUser; // Attach the user to the request object
	  next();
}

export function requireAdmin(req, res, next) {
    const { loggedinUser } = asyncLocalStorage.getStore()

    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    if (!loggedinUser.isAdmin) {
        logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}
