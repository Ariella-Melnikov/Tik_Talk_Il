<template>
    <div :dir="isRtl ? 'rtl' : 'ltr'">
        <!-- <UserMsg /> -->
        <AppHeader />
        <main>
            <RouterView />
        </main>
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    computed: {
        isRtl() {
            return this.$i18n.locale === 'he'
        },
    },
      watch: {
    '$i18n.locale'(newLocale) {
      document.documentElement.setAttribute('dir', newLocale === 'he' ? 'rtl' : 'ltr');
    }
  },
  mounted() {
    document.documentElement.setAttribute('dir', this.$i18n.locale === 'he' ? 'rtl' : 'ltr');
  }
}
</script>

<style>
main {
    min-height: calc(90vh - 1rem);
    padding: 0;
}
</style>
