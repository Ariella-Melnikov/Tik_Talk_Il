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
                    <th>Actions</th>
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
                        <button @click="openEditModal(submission, 'adult')">Edit</button>
                        <button @click="deleteSubmission(submission._id, 'adult')">Delete</button>
                        <button @click="toggleReadStatus(submission._id, 'adult')">
                            {{ submission.isRead ? 'Mark as Unread' : 'Mark as Read' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="openAddModal('adult')">Add New Adult Submission</button>

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
                    <th>Actions</th>
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
                        <button @click="openEditModal(submission, 'kids')">Edit</button>
                        <button @click="deleteSubmission(submission._id, 'kids')">Delete</button>
                        <button @click="toggleReadStatus(submission._id, 'kids')">
                            {{ submission.isRead ? 'Mark as Unread' : 'Mark as Read' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="openAddModal('kids')">Add New Kids Submission</button>

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

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

tr {
    background-color: #faf9ef;
}

/* Make the .read-row a standalone class, not nested under tr */
.read-row {
    background-color: #bde1f1 !important; /* Light blue color to indicate read status */
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
</style>
