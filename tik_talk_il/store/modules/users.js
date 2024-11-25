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
                const loggedInUser = await authService.login(credentials)
                commit('setUser', loggedInUser)
            } catch (err) {
                console.error('Failed to login:', err)
            }
        },
        async signup({ commit }, user) {
            try {
                const loggedInUser = await authService.signup(user)
                commit('setUser', loggedInUser)
            } catch (err) {
                console.error('Failed to signup:', err)
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
