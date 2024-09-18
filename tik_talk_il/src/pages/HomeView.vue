<template>
    <section class="home-section">
        <div class="content-container">
            <div class="text-content">
                <h2>{{ $t('home.heading') }}</h2>
                <p>{{ $t('home.description') }}</p>
                <button @click="openModal" class="action-button">{{ $t('home.actionButton') }}</button>
            </div>
            <img src="@/assets/img/girl1.png" alt="girl" class="home-image" />
        </div>

        <kidsClassForm :open="isModalOpen" @close="closeModal" />
        <div class="content-container">
            <img src="@/assets/img/women.png" alt="girl" class="home-image" />
            <EnglishQuiz />
        </div>
    </section>
</template>

<script>
import kidsClassForm from '@/cmps/kidsClassForm.vue'
import EnglishQuiz from '@/cmps/EnglishQuiz.vue'

export default {
    components: {
        kidsClassForm,
        EnglishQuiz,
    },
    data() {
        return {
            isModalOpen: false,
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        },
    },
}
</script>

<style lang="scss">
.home-section {
    display: grid;
    grid-template-columns: 1fr;
    background-color: #faf9ef;
    padding: 2rem;
}

.content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 15rem;
    max-width: 1600px;
    width: 100%;
    margin: 0 auto 0 auto;
}

.home-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    align-self: end; /* Align the image at the end */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove any margin */
}

.text-content {
    text-align: start;
    padding-right: 2rem;
}

h2 {
    color: #4c3777;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
}

p {
    color: #2d2a6c;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

@media (max-width: 768px) {
    .content-container {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .home-image {
        margin-bottom: 1.5rem;
    }
}
</style>
