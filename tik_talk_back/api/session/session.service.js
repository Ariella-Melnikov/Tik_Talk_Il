import { firebaseService, COLLECTIONS } from '../../services/db/db.service.firebase.js'
import { logger } from '../../services/logger.service.js'

export const sessionService = {
    // Course operations
    createCourse,
    updateCourse,
    getCourseById,
    getAllCourses,
    updateCourseStatus,
    
    // Class operations
    createClass,
    updateClass,
    getClassById,
    getClassesByCourse,
    updateClassStatus,
    updateClassCapacity,
    
    // Registration operations
    registerStudentToClass,
    removeStudentFromClass
}

// Course Management
async function createCourse(courseData) {
    try {
        const course = {
            courseName: courseData.courseName,
            courseType: courseData.courseType,
            courseDescription: courseData.courseDescription || '',
            startDate: new Date(courseData.startDate).toISOString(),
            endDate: new Date(courseData.endDate).toISOString(),
            price: Number(courseData.price),
            status: ['openForRegister'],
            classesList: [],
            studentsList: [],
            createdAt: new Date().toISOString()
        }
        
        return await firebaseService.add(COLLECTIONS.COURSES, course)
    } catch (err) {
        logger.error('Failed to create course', err)
        throw err
    }
}

async function updateCourse(courseId, courseData) {
    try {
        const updateData = {
            ...(courseData.courseName && { courseName: courseData.courseName }),
            ...(courseData.courseDescription && { courseDescription: courseData.courseDescription }),
            ...(courseData.price && { price: Number(courseData.price) }),
            ...(courseData.startDate && { startDate: new Date(courseData.startDate).toISOString() }),
            ...(courseData.endDate && { endDate: new Date(courseData.endDate).toISOString() }),
            updatedAt: new Date().toISOString()
        }
        
        return await firebaseService.update(COLLECTIONS.COURSES, courseId, updateData)
    } catch (err) {
        logger.error(`Failed to update course ${courseId}`, err)
        throw err
    }
}

async function updateCourseStatus(courseId, status) {
    try {
        return await firebaseService.update(COLLECTIONS.COURSES, courseId, {
            status: [status], // 'openForRegister' or 'closeForRegister'
            updatedAt: new Date().toISOString()
        })
    } catch (err) {
        logger.error(`Failed to update course status ${courseId}`, err)
        throw err
    }
}

// Class Management
async function createClass(courseId, classData) {
    try {
        const classSession = {
            courseId,
            date: new Date(classData.date).toISOString(),
            price: Number(classData.price),
            maxStudents: Number(classData.maxStudents || 10),
            currentStudents: 0,
            status: ['openForRegister'],
            studentList: [],
            createdAt: new Date().toISOString()
        }
        
        const newClass = await firebaseService.add(COLLECTIONS.CLASSES, classSession)
        
        // Update course's classesList
        const course = await getCourseById(courseId)
        await firebaseService.update(COLLECTIONS.COURSES, courseId, {
            classesList: [...course.classesList, newClass.id]
        })
        
        return newClass
    } catch (err) {
        logger.error('Failed to create class', err)
        throw err
    }
}

async function updateClassCapacity(classId, maxStudents) {
    try {
        const classDoc = await getClassById(classId)
        if (maxStudents < classDoc.currentStudents) {
            throw new Error('New capacity cannot be less than current number of students')
        }
        
        return await firebaseService.update(COLLECTIONS.CLASSES, classId, {
            maxStudents: Number(maxStudents),
            updatedAt: new Date().toISOString()
        })
    } catch (err) {
        logger.error(`Failed to update class capacity ${classId}`, err)
        throw err
    }
}

async function registerStudentToClass(classId, studentId) {
    try {
        const classDoc = await getClassById(classId)
        
        if (classDoc.currentStudents >= classDoc.maxStudents) {
            throw new Error('Class is full')
        }
        
        if (classDoc.studentList.includes(studentId)) {
            throw new Error('Student already registered to this class')
        }
        
        return await firebaseService.update(COLLECTIONS.CLASSES, classId, {
            studentList: [...classDoc.studentList, studentId],
            currentStudents: classDoc.currentStudents + 1,
            updatedAt: new Date().toISOString()
        })
    } catch (err) {
        logger.error(`Failed to register student ${studentId} to class ${classId}`, err)
        throw err
    }
}

// Helper functions
async function getCourseById(courseId) {
    try {
        return await firebaseService.getById(COLLECTIONS.COURSES, courseId)
    } catch (err) {
        logger.error(`Failed to get course ${courseId}`, err)
        throw err
    }
}

async function getClassById(classId) {
    try {
        return await firebaseService.getById(COLLECTIONS.CLASSES, classId)
    } catch (err) {
        logger.error(`Failed to get class ${classId}`, err)
        throw err
    }
}

async function getAllCourses() {
    try {
        return await firebaseService.query(COLLECTIONS.COURSES)
    } catch (err) {
        logger.error('Failed to get all courses', err)
        throw err
    }
}

async function getClassesByCourse(courseId) {
    try {
        const course = await getCourseById(courseId)
        const classPromises = course.classesList.map(classId => 
            firebaseService.getById(COLLECTIONS.CLASSES, classId)
        )
        return await Promise.all(classPromises)
    } catch (err) {
        logger.error(`Failed to get classes for course ${courseId}`, err)
        throw err
    }
}

async function updateClass(classId, classData) {
    try {
        const updateData = {
            ...(classData.date && { date: new Date(classData.date).toISOString() }),
            ...(classData.price && { price: Number(classData.price) }),
            updatedAt: new Date().toISOString()
        }
        
        return await firebaseService.update(COLLECTIONS.CLASSES, classId, updateData)
    } catch (err) {
        logger.error(`Failed to update class ${classId}`, err)
        throw err
    }
}

async function updateClassStatus(classId, status) {
    try {
        return await firebaseService.update(COLLECTIONS.CLASSES, classId, {
            status: [status], // 'openForRegister' or 'closeForRegister'
            updatedAt: new Date().toISOString()
        })
    } catch (err) {
        logger.error(`Failed to update class status ${classId}`, err)
        throw err
    }
}

async function removeStudentFromClass(classId, studentId) {
    try {
        const classDoc = await getClassById(classId)
        
        if (!classDoc.studentList.includes(studentId)) {
            throw new Error('Student not registered to this class')
        }
        
        const updatedStudentList = classDoc.studentList.filter(id => id !== studentId)
        
        return await firebaseService.update(COLLECTIONS.CLASSES, classId, {
            studentList: updatedStudentList,
            currentStudents: classDoc.currentStudents - 1,
            updatedAt: new Date().toISOString()
        })
    } catch (err) {
        logger.error(`Failed to remove student ${studentId} from class ${classId}`, err)
        throw err
    }
}