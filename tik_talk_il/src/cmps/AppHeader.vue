<template>
    <header ref="stickyHeader" :class="{ scrolled: isScrolled }">
        <h1>{{ $t('header.title') }}</h1>
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
export default {
    data() {
        return {
            isScrolled: false, // Track whether the header is scrolled
        }
    },
    methods: {
        toggleLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'he' ? 'en' : 'he'
        },
        handleScroll() {
            const scrollPosition = window.scrollY

            // If scroll position is greater than 0, mark header as scrolled
            this.isScrolled = scrollPosition > 0
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
    height: 6vh;

    position: sticky;
    top: 0;
    z-index: 1000;

    padding: 10px;
    background-color: lightblue;
    transition: background-color 0.3s ease;

    &.scrolled {
        background-color: #faf9ef; /* New background when sticky */
    }

    nav {
        display: flex;
        gap: 1em;
    }
}
</style>
