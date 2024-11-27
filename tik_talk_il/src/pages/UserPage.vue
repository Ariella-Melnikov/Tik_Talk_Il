<template>
    <section class="user-page">
        <h1>{{ user.fullname }}</h1>
        <div v-if="user">
            <p>
                <strong>{{ $t('user.profile.email') }}:</strong> {{ user.email }}
            </p>
            <p>
                <strong>{{ $t('user.profile.phone') }}:</strong> {{ user.phone }}
            </p>
            <p>
                <strong>{{ $t('user.profile.courseType') }}:</strong> {{ user.courseType }}
            </p>

            <h2>{{ $t('user.profile.sessions') }}</h2>
            <ul>
                <li v-for="(session, index) in user.sessions" :key="index">
                    {{ session.date }} -
                    {{ session.status === 'completed' ? $t('user.profile.completed') : $t('user.profile.upcoming') }}
                </li>
            </ul>
        </div>
        <div v-else class="loading">
            {{ $t('common.loading') }}
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'UserPage',
    data() {
        return {
            loading: true,
            error: null
        }
    },
    computed: {
        ...mapState('users', ['user']),
        userId() {
            return this.$route.params.id
        }
    },
    methods: {
        ...mapActions('user', ['loadUser']),
    },
    async created() {
        try {
            this.loading = true
            
            if (!this.userId) {
                console.error('No user ID in route params')
                this.$router.push('/')
                return
            }

            console.log('Loading user with ID:', this.userId)
            await this.loadUser(this.userId)
            
            if (!this.user?._id) {
                throw new Error('User not found')
            }
        } catch (err) {
            console.error('Failed to load user data:', err)
            this.error = err.message
        } finally {
            this.loading = false
        }
    }
}
</script>

<style lang="scss">
.user-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1rem;
        margin: 0.5rem 0;
    }

    h2 {
        margin-top: 2rem;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            padding: 0.5rem;
            background: #f4f4f4;
            margin-bottom: 0.5rem;
            border-radius: 5px;
        }
    }
}
</style>
