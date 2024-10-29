<template>
    <section class="home-section">
        <div class="content-container kids-banner-container" :style="{ backgroundImage: `url(${kidsBannerImage})` }">
            <div class="text-content">
                <h2>{{ $t('home.heading') }}</h2>
                <p>{{ $t('home.description') }}</p>
                <button @click="openModal" class="action-button">{{ $t('home.actionButton') }}</button>
            </div>
        </div>

        <kidsClassForm :open="isModalOpen" @close="closeModal" />
        <div class="content-container quiz-banner-container" :style="{ backgroundImage: `url(${quizBannerImage})` }">
            <div class="empty-conteiner"></div>
            <div class="quiz-content">
                <EnglishQuiz />
            </div>
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
            kidsBannerImage: '',
            quizBannerImage: '',
        }
    },
    watch: {
        '$i18n.locale': 'updateBannerImages', // Watch for language change to update images
    },
    mounted() {
        this.updateBannerImages() // Initial load for the banner images
    },
    methods: {
        async updateBannerImages() {
            // Dynamically import the images based on locale
            this.kidsBannerImage = (await import(`@/assets/img/banners/kids-banner-${this.$i18n.locale}.png`)).default
            this.quizBannerImage = (await import(`@/assets/img/banners/women-banner-${this.$i18n.locale}.png`)).default
        },
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
    // max-width: 1600px;
    width: 100%;
    margin-block-end: 4rem;
    padding: 2rem;

    .empty-conteiner {
        grid-column: 1; /* Ensure this is in the first column */
    }

    .quiz-content {
        grid-column: 2; /* Ensure this is in the second column */
    }
}

.kids-banner-container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative; /* To allow overlay styling */

    .text-content {
        text-align: start;
        padding-right: 2rem;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    
}

.quiz-banner-container {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    /* Optional overlay */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .quiz-content {
        position: relative;
        z-index: 1;
        text-align: end;
    }
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

// @media (min-width: 1024px) {
//     .quiz-banner-container {
//         background-size: cover; /* Only cover for large screens */
//         background-position: center;
//         padding: 6rem 4rem; /* Adjust padding for larger screens */
//     }
// }
</style>
