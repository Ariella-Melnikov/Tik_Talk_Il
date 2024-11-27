<template>
    <div class="auth-page">
        <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="credentials.email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="credentials.password" required />
            </div>
            <!-- Additional fields for signup -->
            <div v-if="!isLogin" class="form-group">
                <label for="fullname">Full Name:</label>
                <input type="text" id="fullname" v-model="credentials.fullname" required />
            </div>
            <div v-if="!isLogin" class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" v-model="credentials.phone" required />
            </div>
            <div v-if="!isLogin" class="form-group">
                <label for="courseType">Course Type:</label>
                <select id="courseType" v-model="credentials.courseType" required>
                    <option value="General English">General English</option>
                    <option value="Business English">Business English</option>
                    <option value="Kids English">Kids English</option>
                    <option value="English for Women">English for Women</option>
                </select>
            </div>
            <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        </form>
        <button @click="toggleMode">{{ isLogin ? 'Need to sign up?' : 'Already have an account?' }}</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            credentials: {
                email: '',
                password: '',
                fullname: '',
                phone: '',
                courseType: 'General English',
            },
            isLogin: true,
        }
    },
    methods: {
        ...mapActions('users', ['signup', 'login']),
        toggleMode() {
            this.isLogin = !this.isLogin
        },

        async submitForm() {
            try {
                if (this.isLogin) {
                    const response = await this.login(this.credentials)

                    if (response?.user) {
                        const userId = response.user.uid || response.user._id

                        if (response.user.isAdmin) {
                            await this.$router.push('/admin')
                        } else if (userId) {
                            await this.$router.push(`/user/${userId}`)
                        } else {
                            throw new Error('No user ID found')
                        }
                    } else {
                        throw new Error('Invalid login response')
                    }
                } else {
                    const result = await this.signup(this.credentials)
                    alert('Signup successful! Please log in.')
                    this.isLogin = true
                    this.credentials = {
                        email: '',
                        password: '',
                        fullname: '',
                        phone: '',
                        courseType: 'General English',
                    }
                }
            } catch (err) {
                console.error('Authentication error:', err)
                alert(err.message || 'Failed to authenticate')
            }
        },
    },
}
</script>

<style lang="scss">
.auth-page {
    padding: 2rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #4c3777;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #3b2c6a;
}
</style>
