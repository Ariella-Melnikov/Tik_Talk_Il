import express from 'express';
import { addSession, getSessions, deleteSession, updateSession } from './session.controller.js';
import { requireAuth,  requireAdmin} from '../../middlewares/requireAuth.middleware.js';

const router = express.Router();

// Add a new session for a user
router.post('/user/', requireAuth, addSession);

// Get all sessions for a specific user
router.get('/user/:userId', requireAuth, getSessions);

// Update a session by session ID
router.put('/:sessionId', requireAuth, updateSession);

// Delete a session by session ID
router.delete('/:sessionId', requireAuth, deleteSession);

export const sessionRoutes = router;