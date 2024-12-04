import { httpService } from '../http.service.js'

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
    removeStudentFromClass,

    // Composite operations for the UI
    getAvailableSessions,
    getUpcomingSessions,
    getUserSessions,
}

// Course Operations
async function createCourse(courseData) {
    try {
        return await httpService.post('sessions/course', courseData)
    } catch (err) {
        console.error('Cannot create course', err)
        throw err
    }
}

async function updateCourse(courseId, courseData) {
    try {
        return await httpService.put(`sessions/course/${courseId}`, courseData)
    } catch (err) {
        console.error('Cannot update course', err)
        throw err
    }
}

async function getCourseById(courseId) {
    try {
        return await httpService.get(`sessions/course/${courseId}`)
    } catch (err) {
        console.error('Cannot get course', err)
        throw err
    }
}

async function getAllCourses() {
    try {
        const response = await httpService.get('sessions/course') // Update endpoint to match backend
        console.log('API Response:', response)

        // Since response is already an array from your Postman test, we can map directly
        return response.map((course) => ({
            id: course.id, // Changed from _id to id based on your Postman response
            courseName: course.courseName,
            courseType: course.courseType,
            startDate: formatDate(course.startDate._seconds * 1000),
            endDate: formatDate(course.endDate._seconds * 1000),
            price: course.price,
            status: course.status || [],
            classesList: course.classesList || [],
            studentsList: course.studentsList || [],
            courseDescription: course.courseDescription || '',
        }))
    } catch (error) {
        console.error('Failed to fetch courses:', error)
        throw new Error('Failed to load courses')
    }
}

async function updateCourseStatus(courseId, status) {
    try {
        return await httpService.put(`sessions/course/${courseId}/status`, { status })
    } catch (err) {
        console.error('Cannot update course status', err)
        throw err
    }
}

// Class Operations
async function createClass(courseId, classData) {
    try {
        return await httpService.post(`sessions/course/${courseId}/class`, classData)
    } catch (err) {
        console.error('Cannot create class', err)
        throw err
    }
}

async function updateClass(classId, classData) {
    try {
        return await httpService.put(`sessions/class/${classId}`, classData)
    } catch (err) {
        console.error('Cannot update class', err)
        throw err
    }
}

async function getClassById(classId) {
    try {
        return await httpService.get(`sessions/class/${classId}`)
    } catch (err) {
        console.error('Cannot get class', err)
        throw err
    }
}

async function getClassesByCourse(courseId) {
    try {
        return await httpService.get(`sessions/course/${courseId}/classes`)
    } catch (err) {
        console.error('Cannot get classes', err)
        throw err
    }
}

async function updateClassStatus(classId, status) {
    try {
        return await httpService.put(`sessions/class/${classId}/status`, { status })
    } catch (err) {
        console.error('Cannot update class status', err)
        throw err
    }
}

async function updateClassCapacity(classId, maxStudents) {
    try {
        return await httpService.put(`sessions/class/${classId}/capacity`, { maxStudents })
    } catch (err) {
        console.error('Cannot update class capacity', err)
        throw err
    }
}

// Registration Operations
async function registerStudentToClass(classId, userId) {
    try {
        return await httpService.post(`session/class/${classId}/register`, { userId })
    } catch (err) {
        console.error('Cannot register to class', err)
        throw err
    }
}

async function removeStudentFromClass(classId, userId) {
    try {
        return await httpService.delete(`session/class/${classId}/register`, { data: { userId } })
    } catch (err) {
        console.error('Cannot unregister from class', err)
        throw err
    }
}

// Composite Operations for UI
async function getAvailableSessions(courseType) {
    try {
        const courses = await getAllCourses()
        const availableCourses = courses.filter(
            (course) => course.courseType === courseType && course.status.includes('openForRegister')
        )

        const classesPromises = availableCourses.map((course) => getClassesByCourse(course.id))

        const allClasses = await Promise.all(classesPromises)
        return allClasses
            .flat()
            .filter(
                (classItem) =>
                    classItem.status.includes('openForRegister') && classItem.currentStudents < classItem.maxStudents
            )
    } catch (err) {
        console.error('Cannot get available sessions', err)
        throw err
    }
}

async function getUpcomingSessions() {
    try {
        const courses = await getAllCourses()
        const activeCourses = courses.filter((course) => new Date(course.endDate) > new Date())

        const classesPromises = activeCourses.map((course) => getClassesByCourse(course.id))

        const allClasses = await Promise.all(classesPromises)
        return allClasses
            .flat()
            .filter((classItem) => new Date(classItem.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (err) {
        console.error('Cannot get upcoming sessions', err)
        throw err
    }
}

async function getUserSessions(userId) {
    try {
        const courses = await getAllCourses()
        const classesPromises = courses.map((course) => getClassesByCourse(course.id))

        const allClasses = await Promise.all(classesPromises)
        return allClasses
            .flat()
            .filter((classItem) => classItem.studentList.includes(userId))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (err) {
        console.error('Cannot get user sessions', err)
        throw err
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp)
    return date
        .toLocaleDateString('en-IL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jerusalem',
        })
        .replace(/GMT.*$/, '') // Remove the GMT part
}
