import { authService } from '@/services/auth'

export default {
    namespaced: true,
    state: {
        user: null,
        idToken: null,
    },
    mutations: {
        setUser(state, { user, idToken }) {
            state.user = user
            state.idToken = idToken
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await authService.login(credentials)

                // Validate response structure
                if (!response.user || !response.idToken) {
                    throw new Error('Invalid response structure')
                }

                commit('setUser', {
                    user: response.user,
                    idToken: response.idToken,
                })
                return response
            } catch (err) {
                console.error('Login failed:', err)
                throw err
            }
        },
        async signup({ commit }, credentials) {
            try {
                const response = await authService.signup(credentials)

                // Don't commit the user on signup if you want them to login afterward
                return response
            } catch (err) {
                console.error('Signup failed:', err)
                throw err
            }
        },
        logout({ commit }) {
            authService.logout()
            commit('setUser', { user: null, idToken: null })
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        idToken(state) {
            return state.idToken
        },
    },
}
