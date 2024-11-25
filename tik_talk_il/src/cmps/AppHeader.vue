<template>
    <header ref="stickyHeader" :class="{ scrolled: isScrolled, aboutPage: isAboutPage }">
        <img :src="logoSrc" alt="Logo" class="logo" />
        <!-- <h1>{{ $t('header.title') }}</h1> -->
        <nav>
            <RouterLink to="/" class="router-link">{{ $t('header.home') }}</RouterLink>
            <RouterLink to="/about" class="router-link">{{ $t('header.about') }}</RouterLink>
            <RouterLink to="/kids" class="router-link">{{ $t('header.kidsClasses') }}</RouterLink>
            <RouterLink to="/women" class="router-link">{{ $t('header.womenClasses') }}</RouterLink>
            <RouterLink to="/business" class="router-link">{{ $t('header.businessClasses') }}</RouterLink>
            <RouterLink v-if="isAdmin" to="/admin" class="router-link">{{ $t('header.admin') }}</RouterLink>
            <RouterLink v-else-if="isLoggedIn" to="/user" class="router-link">{{ $t('header.user') }}</RouterLink>
            <RouterLink v-else to="/auth" class="router-link">{{ $t('header.login') }}</RouterLink>

            <button v-if="isLoggedIn" @click="logout" class="router-link logout-button">
                {{ $t('header.logout') }}
            </button>
            <button @click="toggleLanguage" class="language-switcher">
                {{ $i18n.locale === 'he' ? 'English' : 'עברית' }}
            </button>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'
import whiteLogo from '@/assets/img/logo/tik_talk_logo_white.png'
import emptyLogo from '@/assets/img/logo/tik_talk_logo_empty.png'

export default {
    data() {
        return {
            isScrolled: false,
            logoSrc: whiteLogo,
        }
    },
    computed: {
        isAboutPage() {
            return this.$route.path === '/about'
        },
        ...mapGetters('users', ['user']),
        isLoggedIn() {
            return !!this.user
        },
        isAdmin() {
            return this.user?.isAdmin || false
        },
    },
    methods: {
        toggleLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'he' ? 'en' : 'he'
        },
        handleScroll() {
            const scrollPosition = window.scrollY

            if (scrollPosition > 0) {
                this.isScrolled = true
                this.logoSrc = emptyLogo
            } else {
                this.isScrolled = false
                this.logoSrc = whiteLogo
            }
        },
        logout() {
            this.$store.dispatch('users/logout')
        },
        checkLoginStatus() {
            // This is a placeholder. You may customize it as per your requirements.
            const user = this.user
            if (user) {
                console.log('User is logged in:', user)
            } else {
                console.log('No user is logged in.')
            }
        },
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll), this.checkLoginStatus()
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
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
    background-image: url('@/assets/img/header_background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-color 0.3s ease;

    &.scrolled {
        background-color: #faf9ef;
        background-image: none;
    }

    &.aboutPage {
        background-image: url('@/assets/img/header-about.png');
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
        transition: background-color 0.3s ease;
    }

    &.aboutPage.scrolled {
        background-color: #faf9ef;
        background-image: none;
    }

    nav {
        display: flex;
        gap: 1.5rem;
        align-items: stretch;
    }

    .logo {
        height: 10rem; /* Adjust the size of the logo */
        transition: opacity 0.3s ease; /* Optional: smooth logo transition */
    }
    .language-switcher {
        background: linear-gradient(45deg, #ffd577, #dc8d7c, #af7b8c);
        color: #ffffff; /* White text color */
        padding: 0.5rem 1.5rem; /* Adjusted padding for smaller size */
        border: none; /* Remove borders */
        border-radius: 50px; /* Rounded button */
        cursor: pointer;
        font-size: 1rem; /* Slightly smaller font size than the action button */
        font-weight: bold; /* Bold text */
        transition: all 0.3s ease; /* Smooth transitions */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        position: relative;
        overflow: hidden;
        z-index: 1;

        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            height: 300%;
            background: rgba(255, 255, 255, 0.15); /* Subtle white glow */
            transition: all 0.5s ease;
            border-radius: 50%;
            z-index: -1;
            transform: translate(-50%, -50%) scale(0); /* Initial hidden state */
        }

        &:hover {
            background: linear-gradient(45deg, #af7b8c, #dc8d7c, #ffd577); /* Reverse gradient on hover */
            transform: translateY(-2px); /* Lift button slightly */
            box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* More pronounced shadow on hover */
        }

        &:hover:before {
            transform: translate(-50%, -50%) scale(1); /* Animate glow on hover */
        }
    }
    .router-link {
        display: flex; /* Make the RouterLink a flex container */
        align-items: stretch; /* Center text vertically */
        justify-content: center; /* Center text horizontally */
        height: 100%; /* Take up the full height of the parent */
        padding: 0.5rem 1.5rem; /* Add some padding */
        color: #4c3777; /* Default text color */
        text-decoration: none; /* Remove underline */
        border: none; /* Remove border */
        background: transparent; /* Remove background */
        transition: all 0.3s ease; /* Smooth transition */
        font-size: 1.1rem;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0 -4px 0 0 #4c3777;
            background: rgba(255, 255, 255, 0.2); /* Add a slight background color on hover */
            border-radius: 0;
        }

        &.router-link-active {
            font-weight: bold;
            border-bottom: 2px solid #4c3777; /* Highlight the active link */
        }
    }

    .language-switcher,
    .logout-button {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .language-switcher {
        margin-left: 1rem;
    }
}
</style>
