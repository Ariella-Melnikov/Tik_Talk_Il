<template>
    <div class="questions-admin">
        <table>
            <thead>
                <tr>
                    <th>{{ $t('table.question') }}</th>
                    <th>{{ $t('table.answers') }}</th>
                    <th>{{ $t('table.correctAnswer') }}</th>
                    <th>{{ $t('table.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in questions" :key="index">
                    <td>{{ question.text }}</td>
                    <td>
                        <ul>
                            <li v-for="option in question.options" :key="option" :class="{ 'correct-answer': option === question.correctAnswer }">
                                {{ option }}
                            </li>
                        </ul>
                    </td>
                    <td :class="{ 'correct-answer': question.correctAnswer }">{{ question.correctAnswer }}</td>
                    <td>
                        <button @click="editQuestion(question)" class="edit-button">{{ $t('actions.edit') }}</button>
                        <button @click="deleteQuestion(question._id)" class="delete-button">{{ $t('actions.delete') }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="openAddModal" class="add-button">{{ $t('actions.addQuestion') }}</button>

        <!-- Add/Edit Question Modal -->
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal">
                <h2>{{ isEditMode ? $t('actions.editQuestion') : $t('actions.addingQuestion') }}</h2>
                <form @submit.prevent="submitQuestion">
                    <label>{{ $t('table.questionText') }}</label>
                    <input v-model="newQuestion.text" placeholder="Question text" required />

                    <label>{{ $t('table.options') }}</label>
                    <div v-for="(option, index) in newQuestion.options" :key="index" class="option-field">
                        <input v-model="newQuestion.options[index]" placeholder="Option" required />
                        <button type="button" @click="removeOption(index)" class="delete-option-button">{{ $t('table.remove') }}</button>
                    </div>
                    <button type="button" @click="addOption" class="add-option-button">{{ $t('table.addOption') }}</button>

                    <label>{{ $t('table.correctAnswer') }}</label>
                    <select v-model="newQuestion.correctAnswer" required>
                        <option v-for="option in newQuestion.options" :key="option" :value="option">{{ option }}</option>
                    </select>

                    <button type="submit" class="save-button">{{ isEditMode ? $t('actions.update') : $t('actions.save') }}</button>
                    <button type="button" @click="closeModal" class="cancel-button">{{ $t('actions.cancel') }}</button>
                </form>
            </div>
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
            isModalOpen: false,
            editQuestionId: null
        };
    },
    computed: {
        ...mapState('questions', ['questions'])
    },
    methods: {
        ...mapActions('questions', ['loadQuestions', 'saveQuestion', 'deleteQuestion']),

        openAddModal() {
            this.isEditMode = false;
            this.newQuestion = this.$store.getters['questions/getEmptyQuestion']();
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },
        addOption() {
            this.newQuestion.options.push('');
        },
        removeOption(index) {
            this.newQuestion.options.splice(index, 1);
        },
        async submitQuestion() {
            if (this.isEditMode) {
                this.newQuestion._id = this.editQuestionId;
            }
            await this.saveQuestion(this.newQuestion); // Calls Vuex action saveQuestion
            this.closeModal();
            await this.loadQuestions();
        },
        editQuestion(question) {
            this.newQuestion = { ...question };
            this.isEditMode = true;
            this.editQuestionId = question._id;
            this.isModalOpen = true;
        },
         async handleDelete(questionId) {
            console.log('Deleting question with ID:', questionId);  // Debug log
            try {
                await this.deleteQuestion(questionId);
                await this.loadQuestions();
            } catch (error) {
                console.error('Error deleting question:', error);
            }
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

    h2 {
        color: #2d2a6c;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    .add-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.7rem 1.5rem;
        background-color: #7a63a8;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2d2a6c;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        th, td {
            padding: 0.75rem;
            text-align: center;
            border: 1px solid #ccc;
        }

        th {
            background-color: #548cc0;
            color: #fff;
            font-weight: 600;
            text-transform: uppercase;
        }

        .correct-answer {
            color: green;
            font-weight: bold;
        }
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: #fff;
        padding: 2rem;
        border-radius: 8px;
        width: 500px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        h2 {
            color: #4c3777;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .option-field {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;

            input {
                flex: 1;
                margin-right: 0.5rem;
            }

            .delete-option-button {
                background-color: #d9534f;
                color: #fff;
                border: none;
                padding: 0.3rem 0.7rem;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: #b52b27;
                }
            }
        }

        .add-option-button, .save-button, .cancel-button {
            background-color: #4c3777;
            color: #fff;
            border: none;
            padding: 0.5rem 1.2rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            transition: background-color 0.3s ease;
            text-transform: uppercase;
            margin-top: 1rem;

            &:hover {
                background-color: #2d2a6c;
            }
        }
    }
}
</style>