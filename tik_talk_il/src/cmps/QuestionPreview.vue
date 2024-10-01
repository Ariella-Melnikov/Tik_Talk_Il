<template>
    <div class="question-card">
        <p class="question-text">{{ question.text }}</p>
        <div class="answer-grid">
            <div v-for="(option, index) in question.options" :key="index" class="answer">
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
        </div>
        <div class="action-buttons">
            <button v-if="!answerSubmitted" @click="submitAnswer" class="action-button" :disabled="!selectedAnswer">
                {{ $t('quiz.submit') }}
            </button>
            <button v-if="answerSubmitted" @click="nextQuestion" class="action-button">{{ $t('quiz.next') }}</button>
        </div>
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
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    text-align: left; /* Ensures left alignment for text */
    margin: 1rem 0;
    direction: ltr;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .question-text {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }
    .answer-grid {
        display: grid;
        grid-template-columns: auto 1fr; /* Auto width for radio buttons, 1fr for text */
        align-items: center;
        gap: 0.5rem 1rem; /* Row gap and column gap */
        margin: 0.5rem 0;
    }

    .answer {
        display: contents; /* Ensures the child elements participate in the grid layout */

        input[type='radio'] {
            margin: 0; /* Remove default margin */
            justify-self: center; /* Align radio button to the right of the first column */
            cursor: pointer;
            transform: scale(1.5); /* Optional: Make radio buttons slightly bigger */
        }

        .answer-text {
            font-size: 1.5rem;
            margin-inline-start: 0.5rem;
            padding: 0;
            justify-self: start; /* Align text to the left of the second column */
            cursor: pointer; /* Change cursor to pointer */
        }
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

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
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
