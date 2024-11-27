import { authService } from '@/services/auth'
import { userService } from '@/services/user'

export default {
    namespaced: true,
    state: {
        user: null,
        idToken: null,
        isLoading: false,
        error: null
    },
    mutations: {
        setUser(state, { user, idToken }) {
            state.user = user
            state.idToken = idToken
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                commit('setLoading', true)
                commit('setError', null)
                
                const response = await authService.login(credentials)

                if (!response || !response.user) {
                    throw new Error('No response from login service')
                }

                const normalizedUser = {
                    ...response.user,
                    _id: response.user.uid || response.user._id,
                }

                commit('setUser', {
                    user: normalizedUser,
                    idToken: response.idToken
                })

                return {
                    user: normalizedUser,
                    idToken: response.idToken
                }
            } catch (err) {
                console.error('Login failed:', err)
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },
        async signup({ commit }, credentials) {
            try {
                commit('setLoading', true)
                commit('setError', null)
                const response = await authService.signup(credentials)
                return response
            } catch (err) {
                console.error('Signup failed:', err)
                commit('setError', err.message)
                throw err
            } finally {
                commit('setLoading', false)
            }
        },
        logout({ commit }) {
            authService.logout()
            commit('setUser', { user: null, idToken: null })
        },
        async loadUser({ commit }, userId) {
            try {
                commit('setLoading', true)
                const user = await userService.getById(userId)
                
                if (!user?._id) {
                    throw new Error('User not found')
                }

                commit('setUser', { user, idToken: this.state.users.idToken })
                return user
            } catch (error) {
                console.error('Failed to load user:', error)
                commit('setError', error.message)
                throw error
            } finally {
                commit('setLoading', false)
            }
        }
    },
    getters: {
        isLoggedIn: state => !!state.user,
        currentUser: state => state.user,
        userId: state => state.user?._id
    }
}
