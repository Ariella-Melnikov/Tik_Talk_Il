import { siteService } from '@/services/site.service.js'

export default {
    namespaced: true,
    state: {
      adultSubmissions: [],
      kidsSubmissions: [],
    },
    mutations: {
      setAdultSubmissions(state, submissions) {
        state.adultSubmissions = submissions
      },
      setKidsSubmissions(state, submissions) {
        state.kidsSubmissions = submissions
      },
      addAdultSubmission(state, submission) {
        state.adultSubmissions.push(submission)
      },
      addKidsSubmission(state, submission) {
        state.kidsSubmissions.push(submission)
      },
      updateAdultSubmission(state, updatedSubmission) {
        const idx = state.adultSubmissions.findIndex(sub => sub._id === updatedSubmission._id)
        if (idx !== -1) state.adultSubmissions.splice(idx, 1, updatedSubmission)
      },
      updateKidsSubmission(state, updatedSubmission) {
        const idx = state.kidsSubmissions.findIndex(sub => sub._id === updatedSubmission._id)
        if (idx !== -1) state.kidsSubmissions.splice(idx, 1, updatedSubmission)
      },
      deleteAdultSubmission(state, submissionId) {
        state.adultSubmissions = state.adultSubmissions.filter(sub => sub._id !== submissionId)
      },
      deleteKidsSubmission(state, submissionId) {
        state.kidsSubmissions = state.kidsSubmissions.filter(sub => sub._id !== submissionId)
      },
    },
    actions: {
      async loadAdultSubmissions({ commit }) {
        try {
          const submissions = await siteService.getAdultSubmissions()
          commit('setAdultSubmissions', submissions)
        } catch (err) {
          console.error('Failed to load adult submissions:', err)
        }
      },
      async loadKidsSubmissions({ commit }) {
        try {
          const submissions = await siteService.getKidsSubmissions()
          commit('setKidsSubmissions', submissions)
        } catch (err) {
          console.error('Failed to load kids submissions:', err)
        }
      },
      async saveSubmission({ commit, state }, { submission, type }) {
        try {
          let savedSubmission
          if (type === 'adult') {
            // Save adult submission
            savedSubmission = await siteService.save(submission, 'adult')
            if (!submission._id) commit('addAdultSubmission', savedSubmission)
            else commit('updateAdultSubmission', savedSubmission)
          } else if (type === 'kids') {
            // Save kids submission
            savedSubmission = await siteService.save(submission, 'kids')
            if (!submission._id) commit('addKidsSubmission', savedSubmission)
            else commit('updateKidsSubmission', savedSubmission)
          }
        } catch (err) {
          console.error(`Failed to save ${type} submission:`, err)
        }
      },
      async deleteSubmission({ commit }, { submissionId, type }) {
        try {
          if (type === 'adult') {
            await siteService.deleteAdultSubmission(submissionId)
            commit('deleteAdultSubmission', submissionId)
          } else {
            await siteService.deleteKidsSubmission(submissionId)
            commit('deleteKidsSubmission', submissionId)
          }
        } catch (err) {
          console.error(`Failed to delete ${type} submission:`, err)
        }
      },
    },
    getters: {
      adultSubmissions(state) {
        return state.adultSubmissions
      },
      kidsSubmissions(state) {
        return state.kidsSubmissions
      },
      getEmptySubmission: () => () => {
        return siteService.getEmptySubmission()
      }
    },
  }