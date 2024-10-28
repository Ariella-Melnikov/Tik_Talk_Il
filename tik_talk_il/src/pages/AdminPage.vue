<template>
     <section class="admin-page">

        <h1>{{ $t('header.admin') }}</h1>

        <AdultSubmissionsTable @edit="openEditModal" @add="openAddModal" />
        <KidsSubmissionsTable @edit="openEditModal" @add="openAddModal" />
        <EditSubmissions v-if="isModalOpen" :submission="modalSubmission" :type="currentFormType" @save="saveSubmission" @close="closeModal" />

        <h2>{{ $t('header.questionsManagement') }}</h2>
        
        <QuestionsAdmin />


    </section>
</template>

<script>
import { mapActions } from 'vuex';
import EditSubmissions from '@/cmps/EditSubmissions.vue';
import QuestionsAdmin from '@/cmps/QuestionsAdmin.vue';
import AdultSubmissionsTable from '@/cmps/AdultSubmissionsTable.vue';
import KidsSubmissionsTable from '@/cmps/KidsSubmissionsTable.vue';

export default {
    components: {
        EditSubmissions,
        QuestionsAdmin,
        AdultSubmissionsTable,
        KidsSubmissionsTable
    },
    data() {
        return {
            isModalOpen: false,
            modalSubmission: null,
            currentFormType: ''
        };
    },
    methods: {
        ...mapActions('submissions', ['saveSubmission', 'loadAdultSubmissions', 'loadKidsSubmissions']),
        openAddModal(type) {
            this.currentFormType = type;
            this.modalSubmission = this.$store.getters['submissions/getEmptySubmission']();
            this.isModalOpen = true;
        },
        openEditModal(submission, type) {
            this.currentFormType = type;
            this.modalSubmission = { ...submission };
            this.isModalOpen = true;
        },
        async saveSubmission(submission) {
            await this.$store.dispatch('submissions/saveSubmission', { submission, type: this.currentFormType });
            this.closeModal();
        },
        closeModal() {
            this.isModalOpen = false;
            this.modalSubmission = null;
        }
    },
    async created() {
        await this.loadAdultSubmissions();
        await this.loadKidsSubmissions();
    }
};
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

</style>
