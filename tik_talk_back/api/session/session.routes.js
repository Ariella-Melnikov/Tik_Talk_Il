import express from 'express';
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js';
import { 
    // Course controllers
    createCourse,
    updateCourseDetails,
    updateCourseStatus,
    getCourse,
    getAllCourses,
    
    // Class controllers
    createClass,
    updateClassDetails,
    updateClassCapacity,
    updateClassStatus,
    getClass,
    getClassesByCourse,
    
    // Registration controllers
    registerToClass,
    unregisterFromClass
} from './session.controller.js';

const router = express.Router();

// Course routes (Admin only)
router.post('/course',  createCourse);
router.put('/course/:courseId',  updateCourseDetails);
router.put('/course/:courseId/status',  updateCourseStatus);
router.get('/course/:courseId',  getCourse);
router.get('/course',  getAllCourses);

// Class routes
router.post('/course/:courseId/class',   createClass);
router.put('/class/:classId',   updateClassDetails);
router.put('/class/:classId/capacity',   updateClassCapacity);
router.put('/class/:classId/status',   updateClassStatus);
router.get('/class/:classId',  getClass);
router.get('/course/:courseId/classes',  getClassesByCourse);

// Registration routes
router.post('/class/:classId/register',  registerToClass);
router.delete('/class/:classId/register',  unregisterFromClass);

export const sessionRoutes = router;