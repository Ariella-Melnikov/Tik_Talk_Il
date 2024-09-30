import { createStore } from 'vuex'
import submissions from './modules/submissions' // Adjust the path if necessary

const store = createStore({
  strict: true,
  modules: {
    submissions,
  },
})

export default store