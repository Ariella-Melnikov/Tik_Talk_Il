<template>
  <div class="english-quiz">
    <h2>{{ $t('quiz.title') }}</h2>
    
    <QuestionList @quiz-completed="handleQuizCompleted" />
    
    <!-- Modal Trigger Button -->
    <div v-if="quizCompleted" class="modal-trigger">
      <button @click="openModal" class="action-button">{{ $t('quiz.signUpForCourse') }}</button>
    </div>

    <!-- Adult Course Sign-Up Modal -->
    <AdultCourseSignUpForm :open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import QuestionList from '@/cmps/QuestionList.vue';
import AdultCourseSignUpForm from '@/cmps/adultsClassesForm.vue'

export default {
  components: {
    QuestionList,
    AdultCourseSignUpForm,
  },
  data() {
    return {
      isModalOpen: false, // Controls modal visibility
      quizCompleted: false, // Indicates if the quiz is completed
    };
  },
  methods: {
    handleQuizCompleted(resultMessage) {
      // Handle the result message from the quiz
      alert(resultMessage);
      this.quizCompleted = true; // Set quizCompleted to true when the quiz ends
    },
    openModal() {
      this.isModalOpen = true; // Open the modal
    },
    closeModal() {
      this.isModalOpen = false; // Close the modal
    },
  },
};
</script>


<style lang="scss">
.english-quiz {
  background-color: #faf9ef;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.modal-trigger {
  margin-top: 2rem;
}

.action-button {
  background: linear-gradient(45deg, #548cc0, #4c3777);
  color: #ffffff;
  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: linear-gradient(45deg, #4c3777, #548cc0);
  transform: translateY(-2px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}
</style>