<template>
    <section>
        <div class="content-container main-banner-container" :style="{ backgroundImage: `url(${mainBannerImage})` }">
            <div class="text-content">
                <div class="main-banner-text">
                    <h1 v-html="$t('home.heading')"></h1>
                    <p v-html="$t('home.description')"></p>
                </div>
                <button @click="openModal" class="action-button">{{ $t('home.actionButton') }}</button>
            </div>
        </div>

        <!-- Buttons Section -->
        <div class="class-grid">
            <!-- Kids Classes -->
            <div class="class-container">
                <img :src="kidsImage" alt="Kids Classes" class="class-image" />
                <h3>{{ $t('home.kidsClasses') }}</h3>
                <div class="button-group">
                    <RouterLink to="/kids#zoom" class="class-button">{{ $t('card.kidsZoom') }}</RouterLink>
                    <RouterLink to="/kids#highschool" class="class-button">{{ $t('card.kidsHighSchool') }}</RouterLink>
                    <RouterLink to="/kids#relocation" class="class-button">{{ $t('card.kidsRelocation') }}</RouterLink>
                </div>
            </div>

            <!-- Women Classes -->
            <div class="class-container">
                <img :src="womenImage" alt="Women Classes" class="class-image" />
                <h3>{{ $t('home.womenClasses') }}</h3>
                <div class="button-group">
                    <RouterLink to="/women#groups" class="class-button">{{ $t('card.womenGroups') }}</RouterLink>
                    <RouterLink to="/women#oneonone" class="class-button">{{ $t('card.womenOneOnOne') }}</RouterLink>
                    <RouterLink to="/women#relocation" class="class-button">{{
                        $t('card.womenRelocation')
                    }}</RouterLink>
                </div>
            </div>

            <!-- Business Classes -->
            <div class="class-container">
                <img :src="businessImage" alt="Business Classes" class="class-image" />
                <h3>{{ $t('home.businessClasses') }}</h3>
                <div class="button-group">
                    <RouterLink to="/business#executives" class="class-button">{{
                        $t('card.businessExecutives')
                    }}</RouterLink>
                    <RouterLink to="/business#events" class="class-button">{{ $t('card.businessEnglish') }}</RouterLink>
                    <RouterLink to="/business#oneonone" class="class-button">{{
                        $t('card.businessEnglish')
                    }}</RouterLink>
                </div>
            </div>
        </div>

        <!-- Kids Form Modal -->
        <kidsClassForm :open="isModalOpen" @close="closeModal" />

        <!-- Quiz Section -->
        <div class="content-container quiz-banner-container" :style="{ backgroundImage: `url(${quizBannerImage})` }">
            <div class="empty-container"></div>
            <div class="quiz-content">
                <EnglishQuiz />
            </div>
        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import kidsClassForm from '@/cmps/kidsClassForm.vue'
import EnglishQuiz from '@/cmps/EnglishQuiz.vue'
import kidsImage from '@/assets/img/cards/kids-main.png'
import womenImage from '@/assets/img/cards/women-main.png'
import businessImage from '@/assets/img/cards/business-main.png'

export default {
    components: {
        RouterLink,
        kidsClassForm,
        EnglishQuiz,
    },
    data() {
        return {
            isModalOpen: false,
            mainBannerImage: '',
            quizBannerImage: '',
            kidsImage,
            womenImage,
            businessImage,
        }
    },
    watch: {
        '$i18n.locale': 'updateBannerImages',
    },
    mounted() {
        this.updateBannerImages()
    },
    methods: {
        async updateBannerImages() {
            try {
                const locale = this.$i18n.locale || 'en' 
                const mainBannerImport = await import(`@/assets/img/banners/main-banner-${locale}.png`)
                const quizBannerImport = await import(`@/assets/img/banners/women-banner-${locale}.png`)

                this.mainBannerImage = mainBannerImport.default
                this.quizBannerImage = quizBannerImport.default

            } catch (err) {
                console.error('Failed to update banner images:', err)

                // Fallback images
                this.mainBannerImage = require('@/assets/img/banners/main-banner-en.png').default
                this.quizBannerImage = require('@/assets/img/banners/women-banner-en.png').default
            }
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

.class-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Dynamic grid layout */
    gap: 2rem; /* Space between containers */
    padding: 1rem;
}

.class-container {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.class-image {
    width: 90%;
    height: auto; /* Maintain aspect ratio */
    object-fit: cover;
    border-radius: 8px; /* Rounded corners for the image */
    margin-bottom: 1rem; /* Add space below the image */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for the image */
}

h3 {
    margin: 1rem 0;
    font-size: 1.75rem;
    color: #4c3777;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%; /* Ensure buttons span full width */
    align-items: center;
}

.class-button {
    background-color: #4c3777;
    color: #ffffff;
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1.3rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
    width: 80%; /* Make buttons fit nicely inside the card */

    &:hover {
        background-color: #dbd872;
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
