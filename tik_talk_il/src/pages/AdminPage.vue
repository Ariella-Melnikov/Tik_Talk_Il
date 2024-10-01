<template>
    <div class="admin-page">
        <h1>{{ $t('header.admin') }}</h1>

        <!-- Adult Submissions Table -->
        <h2>{{ $t('table.adultheader') }}</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ $t('table.fullname') }}</th>
                    <th>{{ $t('table.email') }}</th>
                    <th>{{ $t('table.phone') }}</th>
                    <th>{{ $t('table.course') }}</th>
                    <th>{{ $t('table.subscribed') }}</th>
                    <th>{{ $t('table.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(submission, index) in adultSubmissions"
                    :key="index"
                    :class="{ 'read-row': submission.isRead }">
                    <td>{{ submission.fullName }}</td>
                    <td>{{ submission.email }}</td>
                    <td>{{ submission.phone }}</td>
                    <td>{{ submission.courseType }}</td>
                    <td>{{ submission.isSubscribe ? 'Yes' : 'No' }}</td>
                    <td>
                        <button @click="openEditModal(submission, 'adult')" class = "edit-button">{{ $t('actions.edit') }}</button>
                        <button @click="deleteSubmission(submission._id, 'adult')" class = "delete-button">{{ $t('actions.delete') }}</button>
                        <button @click="toggleReadStatus(submission._id, 'adult')" class = "mark-button">
                            {{ submission.isRead ?  $t('actions.markAsUnread') : $t('actions.markAsRead') }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="openAddModal('adult')" class = "add-button">{{ $t('actions.addNewAdultSubmission') }}</button>

        <!-- Kids Submissions Table -->
        <h2>{{ $t('table.kidsheader') }}</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ $t('table.parentname') }}</th>
                    <th>{{ $t('table.parentemail') }}</th>
                    <th>{{ $t('table.parentphone') }}</th>
                    <th>{{ $t('table.kidsage') }}</th>
                    <th>{{ $t('table.subscribed') }}</th>
                    <th>{{ $t('table.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(submission, index) in kidsSubmissions"
                    :key="index"
                    :class="{ 'read-row': submission.isRead }">
                    <td>{{ submission.parentFullName }}</td>
                    <td>{{ submission.parentEmail }}</td>
                    <td>{{ submission.parentPhone }}</td>
                    <td>{{ submission.kidsAge }}</td>
                    <td>{{ submission.isSubscribe ? 'Yes' : 'No' }}</td>
                    <td>
                        <button @click="openEditModal(submission, 'kids')" class = "edit-button">{{ $t('actions.edit') }}</button>
                        <button @click="deleteSubmission(submission._id, 'kids')" class = "delete-button">{{ $t('actions.delete') }}</button>
                        <button @click="toggleReadStatus(submission._id, 'kids')" class = "mark-button">
                            {{ submission.isRead ? $t('actions.markAsUnread') : $t('actions.markAsRead') }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="openAddModal('kids')" class = "add-button">{{ $t('actions.addNewKidsSubmission') }}</button>

        <!-- Add/Edit Submission Modal -->
        <edit-submissions
            v-if="isModalOpen"
            :submission="modalSubmission"
            :type="currentFormType"
            @save="saveSubmission"
            @close="closeModal" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditSubmissions from '@/cmps/EditSubmissions.vue'

export default {
    components: {
        'edit-submissions': EditSubmissions,
    },
    data() {
        return {
            isModalOpen: false,
            modalSubmission: null,
            currentFormType: '', // Track whether the current form is 'adult' or 'kids'
        }
    },
    computed: {
        ...mapGetters('submissions', ['adultSubmissions', 'kidsSubmissions']), // Map getters from Vuex store
    },
    async created() {
        this.loadAdultSubmissions() // Load adult submissions from the store
        this.loadKidsSubmissions() // Load kids submissions from the store
    },
    methods: {
        ...mapActions('submissions', [
            'loadAdultSubmissions',
            'loadKidsSubmissions',
            'saveSubmission',
            'deleteSubmission',
            'toggleSubmissionReadStatus',
        ]), // Map actions from Vuex store

        async loadSubmissions() {
            await this.$store.dispatch('submissions/loadAdultSubmissions')
            await this.$store.dispatch('submissions/loadKidsSubmissions')
        },

        // Open modal for adding a new submission
        openAddModal(type) {
            this.currentFormType = type
            this.modalSubmission = this.$store.getters['submissions/getEmptySubmission']() // Use store getter to get empty submission
            this.isModalOpen = true
        },

        // Open modal for editing an existing submission
        openEditModal(submission, type) {
            this.currentFormType = type
            this.modalSubmission = { ...submission } // Copy the submission to edit
            this.isModalOpen = true
        },

        // Save the submission (either add new or edit existing)
        async saveSubmission(submission) {
            try {
                // Use correct Vuex action for saving
                await this.$store.dispatch('submissions/saveSubmission', {
                    submission,
                    type: this.currentFormType,
                })

                this.closeModal()
                await this.loadSubmissions()
                console.log(this.loadSubmissions)
            } catch (err) {
                console.error('Failed to save submission:', err)
            }
        },

        // Close modal
        closeModal() {
            this.isModalOpen = false
            this.modalSubmission = null
        },

        // Delete a submission
        async deleteSubmission(submissionId, type) {
            await this.$store.dispatch('submissions/deleteSubmission', { submissionId, type })
            await this.loadSubmissions()
        },
        // Mark a submission as read
        async toggleReadStatus(submissionId, type) {
            try {
                await this.$store.dispatch('submissions/toggleSubmissionReadStatus', { submissionId, type })
            } catch (err) {
                console.error(`Failed to toggle read status for ${type} submission:`, err)
            }
        },
    },
}
</script>

<style lang="scss">
.admin-page {
    padding: 2rem;
}

  h1 {
        text-align: center;
        color: #4c3777;
        margin-bottom: 1.5rem;
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 600;
    }

    h2 {
        color: #2d2a6c;
        margin: 2rem 0 1rem;
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 500;
    }

    .add-button {
        display: inline-block;
        margin: 1.5rem 0;
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

    th,
    td {
        border: 1px solid #ccc;
        padding: 0.75rem;
        text-align: center;
    }

    th {
        background-color: #548cc0;
        color: #ffffff;
        font-weight: 600;
        text-transform: uppercase;
    }

    tr {
        background-color: #faf9ef;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #f0f0f0;
        }
    }
}

/* Make the .read-row a standalone class, not nested under tr */
.read-row {
    background-color: #bde1f1 !important; /* Light blue color to indicate read status */
}

button {
    display: inline-block;
    margin: 0.2rem 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #7a63a8;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2d2a6c;
    }

    &.mark-button {
        background-color: #4c3777;
        &:hover {
            background-color: #2d2a6c;
        }
    }

    &.delete-button {
        background-color: #c53939;
        &:hover {
            background-color: #9e2929;
        }
    }

    &.edit-button {
        background-color: #2d6c2d;
        &:hover {
            background-color: #1e4d1e;
        }
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

    form {
        display: flex;
        flex-direction: column;

        label {
            margin: 0.5rem 0;
            font-weight: 500;
            color: #333;
        }

        input {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 1rem;

            &:focus {
                outline: none;
                border-color: #548cc0;
                box-shadow: 0 0 4px rgba(84, 140, 192, 0.3);
            }
        }

        button {
            padding: 0.7rem 1.5rem;
            background-color: #4c3777;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            transition: background-color 0.3s ease;
            margin-top: 1rem;

            &:hover {
                background-color: #2d2a6c;
            }
        }
    }
}
</style>
