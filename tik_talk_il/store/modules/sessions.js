import { sessionService } from '@/services/session'

export default {
    namespaced: true,
    state: {
        courses: [],
        availableSessions: [],
        userSessions: [],
        upcomingSessions: [],
        isLoading: false,
        error: null
    },
    mutations: {
        setCourses(state, courses) {
            state.courses = courses
        },
        setAvailableSessions(state, sessions) {
            state.availableSessions = sessions
        },
        setUserSessions(state, sessions) {
            state.userSessions = sessions
        },
        setUpcomingSessions(state, sessions) {
            state.upcomingSessions = sessions
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        // Course actions
        async createCourse({ commit }, courseData) {
            try {
                commit('setLoading', true)
                const course = await sessionService.createCourse(courseData)
                return course
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        async loadAllCourses({ commit }) {
            commit('setLoading', true)
            commit('setError', null)
            
            try {
                const courses = await sessionService.getAllCourses()
                commit('setCourses', courses)
            } catch (error) {
                commit('setError', error.message)
                throw error
            } finally {
                commit('setLoading', false)
            }
        },

        // Class actions
        async createClass({ commit }, { courseId, classData }) {
            try {
                commit('setLoading', true)
                const newClass = await sessionService.createClass(courseId, classData)
                return newClass
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        async updateClassCapacity({ commit }, { classId, maxStudents }) {
            try {
                commit('setLoading', true)
                return await sessionService.updateClassCapacity(classId, maxStudents)
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        // Session loading actions
        async loadUpcomingSessions({ commit }) {
            try {
                commit('setLoading', true)
                const sessions = await sessionService.getUpcomingSessions()
                commit('setUpcomingSessions', sessions)
                return sessions
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        async loadAvailableSessions({ commit }, courseType) {
            try {
                commit('setLoading', true)
                const sessions = await sessionService.getAvailableSessions(courseType)
                commit('setAvailableSessions', sessions)
                return sessions
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        async loadUserSessions({ commit }, userId) {
            try {
                commit('setLoading', true)
                const sessions = await sessionService.getUserSessions(userId)
                commit('setUserSessions', sessions)
                return sessions
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        // Registration actions
        async registerToClass({ commit }, { classId, userId }) {
            try {
                commit('setLoading', true)
                return await sessionService.registerStudentToClass(classId, userId)
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },

        async unregisterFromClass({ commit }, { classId, userId }) {
            try {
                commit('setLoading', true)
                return await sessionService.removeStudentFromClass(classId, userId)
            } catch (err) {
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        }
    },
    getters: {
        courses: state => state.courses,
        availableSessions: state => state.availableSessions,
        userSessions: state => state.userSessions,
        upcomingSessions: state => state.upcomingSessions || [],
        isLoading: state => state.isLoading,
        error: state => state.error
    }
}