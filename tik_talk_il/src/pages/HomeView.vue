<template>
    <section>
        <div class=" content-container main-banner-container" :style="{ backgroundImage: `url(${mainBannerImage})` }">
            <div class="text-content">
                <div class="main-banner-text">
                    <h1 v-html="$t('home.heading')"></h1>
                    <p v-html="$t('home.description')"></p>
                </div>

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
            mainBannerImage: '',
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
            this.mainBannerImage = (await import(`@/assets/img/banners/main-banner-${this.$i18n.locale}.png`)).default
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

.content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100vw;
    height: 100vh; 
    margin-bottom: 3rem;
    padding: 2rem;
}

.main-banner-container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 70vh;
    text-align: center;
    position: relative;
    color: #ffffff;

    .main-banner-text {
        h1 {
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 1.2;
        }

        p {
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
            line-height: 1.8;
        }
    }

    .action-button {
        background-color: #dbd872;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: #4c3777;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #b3b061;
        }
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4); /* Adds a dark overlay */
        z-index: 0;
    }

    .text-content {
        position: relative;
        z-index: 1;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
}

.quiz-banner-container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2); /* Adds a light overlay */
        z-index: 0;
    }

    .quiz-content {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 2rem;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
}

// @media (max-width: 768px) {
//     .content-container {
//         grid-template-columns: 1fr;
//         gap: 2rem;
//     }

//     .main-banner-container {
//         padding: 2rem;

//         .main-banner-text {
//             h2 {
//                 font-size: 2rem;
//             }

//             p {
//                 font-size: 1rem;
//             }
//         }

//         .action-button {
//             font-size: 0.9rem;
//             padding: 0.5rem 1rem;
//         }
//     }

//     .quiz-banner-container {
//         .quiz-content {
//             padding: 1.5rem;
//         }
//     }
// }
</style>
