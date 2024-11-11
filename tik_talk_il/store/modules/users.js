import { userService } from '@/services/user';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loadUser({ commit }, userId) {
      try {
        const user = await userService.getById(userId);
        commit('setUser', user);
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};