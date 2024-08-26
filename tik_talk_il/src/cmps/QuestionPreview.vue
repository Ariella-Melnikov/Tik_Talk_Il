<template>
    <div class="question-card">
        <p class="question-text">{{ question.text }}</p>
        <div v-for="(option, index) in question.options" :key="index">
            <input
                type="radio"
                :name="'question' + question._id"
                :id="'q' + question._id + 'o' + index"
                :value="option"
                v-model="selectedAnswer"
                :disabled="answerSubmitted" />
            <label :class="getOptionClass(option)" class="answer-text" :for="'q' + question._id + 'o' + index">
                {{ option }}
            </label>
        </div>
        <button v-if="!answerSubmitted" @click="submitAnswer" class="action-button" :disabled="!selectedAnswer">
            {{ $t('quiz.submit') }}
        </button>
        <button v-if="answerSubmitted" @click="nextQuestion" class="action-button">{{ 'Next' }}</button>
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
    },
    data() {
        return {
            selectedAnswer: null,
            answerSubmitted: false,
            isCorrect: false,
        }
    },
    methods: {
        submitAnswer() {
            this.isCorrect = this.selectedAnswer === this.question.correctAnswer
            this.answerSubmitted = true
        },
        nextQuestion() {
            this.$emit('answer', {
                questionId: this.question._id,
                answer: this.selectedAnswer,
                isCorrect: this.isCorrect,
            })
            // Reset the state for the next question
            this.selectedAnswer = null
            this.answerSubmitted = false
        },
        getOptionClass(option) {
            if (!this.answerSubmitted) return ''
            if (option === this.question.correctAnswer) return 'correct'
            if (option === this.selectedAnswer) return 'incorrect'
            return ''
        },
    },
}
</script>

<style lang="scss">
.question-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin: 1rem 0;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .question-text {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .answer-text {
        font-size: 1.5rem; // Make the answer text slightly larger
    }
}

.correct {
    color: green;
    font-weight: bold;
}

.incorrect {
    color: red;
    font-weight: bold;
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
    margin-top: 1rem;
}

.action-button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.action-button:hover:not(:disabled) {
    background: linear-gradient(45deg, #4c3777, #548cc0);
    transform: translateY(-2px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
