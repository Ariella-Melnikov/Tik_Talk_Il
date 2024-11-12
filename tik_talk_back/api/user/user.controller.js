import { userService } from './user.service.js'
import { logger } from '../../services/logger.service.js'
// import { socketService } from '../../services/socket.service.js'

export async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(400).send({ err: 'Failed to get user' })
    }
}

export async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0,
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(400).send({ err: 'Failed to get users' })
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(400).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {
    
    try {
        const userId = req.params.id;
        const user = req.body;
    
        console.log('Logged in user:', req.loggedinUser);
    
        // Ensure the logged-in user can only update their own data or if admin
        if (req.loggedinUser._id !== userId && !req.loggedinUser.isAdmin) {
          return res.status(403).send({ err: 'Unauthorized - Only admin or self can update' });
        }
    
        // Allow `isAdmin` updates only if the current user is an admin
        if (!req.loggedinUser.isAdmin && 'isAdmin' in user) {
          delete user.isAdmin;
        }
    
        const updatedUser = await userService.update(userId, user);
        res.send(updatedUser);
        
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(400).send({ err: 'Failed to update user' })
    }
}
