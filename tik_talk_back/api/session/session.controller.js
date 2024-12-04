import { sessionService } from './session.service.js'
import { logger } from '../../services/logger.service.js'

// Course Controllers
export async function createCourse(req, res) {
    try {
        const courseData = req.body
        const course = await sessionService.createCourse(courseData)
        res.json(course)
    } catch (err) {
        logger.error('Failed to create course', err)
        res.status(500).json({ error: err.message })
    }
}

export async function updateCourseDetails(req, res) {
    try {
        const { courseId } = req.params
        const courseData = req.body
        const updatedCourse = await sessionService.updateCourse(courseId, courseData)
        res.json(updatedCourse)
    } catch (err) {
        logger.error('Failed to update course', err)
        res.status(500).json({ error: err.message })
    }
}

export async function updateCourseStatus(req, res) {
    try {
        const { courseId } = req.params
        const { status } = req.body
        const updatedCourse = await sessionService.updateCourseStatus(courseId, status)
        res.json(updatedCourse)
    } catch (err) {
        logger.error('Failed to update course status', err)
        res.status(500).json({ error: err.message })
    }
}

export async function getCourse(req, res) {
    try {
        const { courseId } = req.params
        const course = await sessionService.getCourseById(courseId)
        res.json(course)
    } catch (err) {
        logger.error('Failed to get course', err)
        res.status(500).json({ error: err.message })
    }
}

export async function getAllCourses(req, res) {
    try {
        const courses = await sessionService.getAllCourses()
        res.json(courses)
    } catch (err) {
        logger.error('Failed to get all courses', err)
        res.status(500).json({ error: err.message })
    }
}

// Class Controllers
export async function createClass(req, res) {
    try {
        const { courseId } = req.params
        const classData = req.body
        const newClass = await sessionService.createClass(courseId, classData)
        res.json(newClass)
    } catch (err) {
        logger.error('Failed to create class', err)
        res.status(500).json({ error: err.message })
    }
}

export async function updateClassDetails(req, res) {
    try {
        const { classId } = req.params
        const classData = req.body
        const updatedClass = await sessionService.updateClass(classId, classData)
        res.json(updatedClass)
    } catch (err) {
        logger.error('Failed to update class', err)
        res.status(500).json({ error: err.message })
    }
}

export async function updateClassCapacity(req, res) {
    try {
        const { classId } = req.params
        const { maxStudents } = req.body
        const updatedClass = await sessionService.updateClassCapacity(classId, maxStudents)
        res.json(updatedClass)
    } catch (err) {
        logger.error('Failed to update class capacity', err)
        res.status(500).json({ error: err.message })
    }
}

export async function updateClassStatus(req, res) {
    try {
        const { classId } = req.params
        const { status } = req.body
        const updatedClass = await sessionService.updateClassStatus(classId, status)
        res.json(updatedClass)
    } catch (err) {
        logger.error('Failed to update class status', err)
        res.status(500).json({ error: err.message })
    }
}

export async function getClass(req, res) {
    try {
        const { classId } = req.params
        const classData = await sessionService.getClassById(classId)
        res.json(classData)
    } catch (err) {
        logger.error('Failed to get class', err)
        res.status(500).json({ error: err.message })
    }
}

export async function getClassesByCourse(req, res) {
    try {
        const { courseId } = req.params
        const classes = await sessionService.getClassesByCourse(courseId)
        res.json(classes)
    } catch (err) {
        logger.error('Failed to get classes', err)
        res.status(500).json({ error: err.message })
    }
}

// Registration Controllers
export async function registerToClass(req, res) {
    try {
        const { classId } = req.params
        const { userId } = req.body
        const updatedClass = await sessionService.registerStudentToClass(classId, userId)
        res.json(updatedClass)
    } catch (err) {
        logger.error('Failed to register to class', err)
        res.status(500).json({ error: err.message })
    }
}

export async function unregisterFromClass(req, res) {
    try {
        const { classId } = req.params
        const { userId } = req.body
        const updatedClass = await sessionService.removeStudentFromClass(classId, userId)
        res.json(updatedClass)
    } catch (err) {
        logger.error('Failed to unregister from class', err)
        res.status(500).json({ error: err.message })
    }
}
