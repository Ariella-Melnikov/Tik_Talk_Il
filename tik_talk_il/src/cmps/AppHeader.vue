<template>
    <header>
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
    methods: {
        toggleLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'he' ? 'en' : 'he'
        },
    },
}
</script>

<style lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6vh;

    padding: 10px;
    background-color: lightblue;

    nav {
        display: flex;
        gap: 1em;
    }
}
</style>
