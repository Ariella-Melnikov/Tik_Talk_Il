<template>
  <div class="quiz-section">
    <previewQuestion
      v-if="currentQuestion"
      :question="currentQuestion"
      @answer="handleAnswer"
    />
    <div v-if="quizCompleted">
      <h3>{{ $t('quiz.resultTitle') }}</h3>
      <p>{{ resultMessage }}</p>
      <button @click="startCourse" class="action-button">{{ $t('quiz.startCourse') }}</button>
    </div>
  </div>
</template>

<script>
import { questionService } from '@/services/question.service.js';
import previewQuestion from '@/cmps/QuestionPreview.vue';

export default {
  components: {
    previewQuestion,
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      correctAnswersCount: 0,
      quizCompleted: false,
      resultMessage: '',
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  async created() {
    this.questions = await questionService.getquestions();
  },
  methods: {
    handleAnswer({ questionId, isCorrect }) {
      if (isCorrect) {
        this.correctAnswersCount++;
      }
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.calculateResult();
      }
    },
    calculateResult() {
      if (this.correctAnswersCount === this.questions.length) {
        this.resultMessage = this.$t('quiz.perfectScoreMessage');
      } else if (this.correctAnswersCount > 0) {
        this.resultMessage = this.$t('quiz.partialScoreMessage', { count: this.correctAnswersCount });
      } else {
        this.resultMessage = this.$t('quiz.lowScoreMessage');
      }

      this.quizCompleted = true;
    },
    startCourse() {
      this.$emit('open-modal');
    },
  },
};
</script>

<style lang="scss">
.quiz-section {
  padding: 2rem;
}
</style>