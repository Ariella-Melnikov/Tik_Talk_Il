<template>
    <header ref="stickyHeader" :class="{ scrolled: isScrolled }">
        <img :src="logoSrc" alt="Logo" class="logo" />
        <!-- <h1>{{ $t('header.title') }}</h1> -->
        <nav>
            <RouterLink to="/">{{ $t('header.home') }}</RouterLink>
            <RouterLink to="/about">{{ $t('header.about') }}</RouterLink>
            <button @click="toggleLanguage" class="language-switcher">
                {{ $i18n.locale === 'he' ? 'English' : 'עברית' }}
            </button>
        </nav>
    </header>
</template>

<script>
import whiteLogo from '@/assets/img/logo/tik_talk_logo_white.png'
import emptyLogo from '@/assets/img/logo/tik_talk_logo_empty.png'
import background from '@/assets/img/header_background.png'

export default {
    data() {
        return {
            isScrolled: false, // Track whether the header is scrolled
            logoSrc: whiteLogo,
        }
    },
    methods: {
        toggleLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'he' ? 'en' : 'he'
        },
        handleScroll() {
            const scrollPosition = window.scrollY

            // If scroll position is greater than 0, mark header as scrolled
            if (scrollPosition > 0) {
                this.isScrolled = true
                this.logoSrc = emptyLogo // Switch to sticky logo
            } else {
                // If at top of page, switch back to white logo
                this.isScrolled = false
                this.logoSrc = whiteLogo // Switch back to default logo
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll) // Attach scroll event listener
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll) // Clean up event listener
    },
}
</script>

<style lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;

    position: sticky;
    top: 0;
    z-index: 1000;

    padding: 10px;
    background-image: url('@/assets/img/header_background.png'); /* Set background image */
    background-size: cover; /* Ensure the background covers the entire header */
    background-position: center; /* Center the background image */
    background-repeat: no-repeat; /* Avoid background repetition */
    transition: background-color 0.3s ease;

    &.scrolled {
        background-color: #faf9ef; /* New background when sticky */
        background-image: none; /* Optionally remove background image when scrolled */
    }

    nav {
        display: flex;
        gap: 1em;
    }

    .logo {
        height: 10rem; /* Adjust the size of the logo */
        transition: opacity 0.3s ease; /* Optional: smooth logo transition */
    }
}
</style>
