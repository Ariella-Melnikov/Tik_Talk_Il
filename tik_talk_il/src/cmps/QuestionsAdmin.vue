<template>
  <div class="questions-admin">
    <h1>Add a question</h1>
    <form @submit.prevent="saveQuestion">
      <input v-model="newQuestion.text" placeholder="Question text" required />
      <div v-for="(option, index) in newQuestion.options" :key="index">
        <input v-model="newQuestion.options[index]" placeholder="Option" required />
        <button type="button" @click="removeOption(index)">Remove</button>
      </div>
      <button type="button" @click="addOption">Add Option</button>
      <select v-model="newQuestion.correctAnswer" required>
        <option v-for="option in newQuestion.options" :key="option" :value="option">{{ option }}</option>
      </select>
      <button type="submit">{{ isEditMode ? "Update" : "Add" }} Question</button>
    </form>

    <div v-for="question in questions" :key="question._id">
      <p>{{ question.text }}</p>
      <ul>
        <li v-for="option in question.options" :key="option">{{ option }}</li>
      </ul>
      <button @click="editQuestion(question)">Edit</button>
      <button @click="deleteQuestion(question._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      newQuestion: this.$store.getters['questions/getEmptyQuestion'](),
      isEditMode: false,
      editQuestionId: null
    };
  },
  computed: {
    ...mapState('questions', ['questions'])
  },
  methods: {
    ...mapActions('questions', ['loadQuestions', 'saveQuestion', 'deleteQuestion']),
    addOption() {
      this.newQuestion.options.push('');
    },
    removeOption(index) {
      this.newQuestion.options.splice(index, 1);
    },
    async saveQuestion() {
      if (this.isEditMode) {
        this.newQuestion._id = this.editQuestionId;
      }
      await this.saveQuestion(this.newQuestion);
      this.resetForm();
      await this.loadQuestions(); // Reload questions after save
    },
    editQuestion(question) {
      this.newQuestion = { ...question };
      this.isEditMode = true;
      this.editQuestionId = question._id;
    },
    async deleteQuestion(questionId) {
      await this.deleteQuestion(questionId);
      await this.loadQuestions(); // Reload questions after delete
    },
    resetForm() {
      this.newQuestion = this.$store.getters['questions/getEmptyQuestion']();
      this.isEditMode = false;
      this.editQuestionId = null;
    }
  },
  async created() {
    await this.loadQuestions();
  }
};
</script>

<style lang="scss">
.questions-admin {
  padding: 2rem;
  background-color: #fcfcfc;
  direction: ltr;

  h1 {
    text-align: center;
    color: #4c3777;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .add-question-form {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    h2 {
      color: #548cc0;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    label {
      font-weight: bold;
      color: #333333;
      display: block;
      margin-top: 1rem;
    }

    input, select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #548cc0;
        box-shadow: 0 0 4px rgba(84, 140, 192, 0.3);
      }
    }

    .option-field {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      input {
        flex: 1;
        margin-right: 0.5rem;
      }

      button {
        background-color: #d9534f;
        color: #ffffff;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #b52b27;
        }
      }
    }

    .save-button {
      background-color: #4c3777;
      color: #ffffff;
      padding: 0.7rem 1.5rem;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: background-color 0.3s ease;
      text-transform: uppercase;

      &:hover {
        background-color: #2d2a6c;
      }
    }
  }

  .question-list {
    .question-item {
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      p {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333333;
        margin-bottom: 0.5rem;
      }

      ul {
        list-style-type: none;
        padding-left: 1rem;
        margin: 0;

        li {
          font-size: 1rem;
          color: #666666;
          margin-bottom: 0.3rem;
        }
      }

      button {
        background-color: #548cc0;
        color: #ffffff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
        margin-right: 0.5rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #4c3777;
        }

        &.delete-button {
          background-color: #d9534f;

          &:hover {
            background-color: #b52b27;
          }
        }
      }
    }
  }
}

</style>