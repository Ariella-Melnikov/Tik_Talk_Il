import { createStore } from 'vuex'
import submissions from './modules/submissions' // Adjust the path if necessary
import questions from './modules/questions' // Adjust the path if necessary
import users from './modules/users' // Adjust the path if necessary

const store = createStore({
  strict: true,
  modules: {
    submissions,
    questions,
    users,
  },
})

export default store