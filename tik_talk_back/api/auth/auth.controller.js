import { authService } from './auth.service.js'
import { logger } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'

export async function login(req, res) {
	const { username, password } = req.body
	try {
		const user = await authService.login(username, password)
		const loginToken = authService.getLoginToken(user)
        
		logger.info('User login: ', user)
        
		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		res.json(user)
	} catch (err) {
		logger.error('Failed to Login ' + err)
		res.status(401).send({ err: 'Failed to Login' })
	}
}

export async function signup(req, res) {
	try {
		const credentials = req.body

		// Never log passwords
		// logger.debug(credentials)
		
        const account = await authService.signup(credentials)
		logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
		
        const user = await authService.login(credentials.username, credentials.password)
		logger.info('User signup:', user)
		
        const loginToken = authService.getLoginToken(user)
		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		res.json(user)
	} catch (err) {
		logger.error('Failed to signup ' + err)
		res.status(400).send({ err: 'Failed to signup' })
	}
}

export async function logout(req, res) {
	try {
		res.clearCookie('loginToken')
		res.send({ msg: 'Logged out successfully' })
	} catch (err) {
		res.status(400).send({ err: 'Failed to logout' })
	}
}

export async function addAdminUser(req, res) {
    try {
		const { username, password, fullname, email, phone } = req.body;
		console.log('Add Admin route called 2')

        if (process.env.ALLOW_ADMIN_CREATION !== 'true') {
            return res.status(403).send({ err: 'Admin creation is not allowed' });
        }

        if (!username || !password || !fullname || !email) {
            return res.status(400).send({ err: 'Missing required fields' });
        }

        // Check if the username is already taken
        const existingUser = await userService.getByUsername(username);
        if (existingUser) {
            return res.status(400).send({ err: 'Username already taken' });
        }

        const account = await authService.addAdmin({ username, password, fullname, email, phone });
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account));

		const user = await authService.login(username, password)
		logger.info('User signup:', user)
		
        const loginToken = authService.getLoginToken(user)

		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true });
        res.json(user);
    } catch (err) {
        logger.error('Failed to add admin', err);
        res.status(400).send({ err: 'Failed to add admin' });
    }
}