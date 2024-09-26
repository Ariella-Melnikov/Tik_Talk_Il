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
            <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        </form>
        <button @click="toggleMode">{{ isLogin ? 'Need to sign up?' : 'Already have an account?' }}</button>
    </div>
</template>

<script>
import { adminService } from '../services/admin.service.js';
import {storageService} from '../services/storage.service.js';

export default {
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            },
            isLogin: true
        };
    },
    methods: {
        toggleMode() {
            this.isLogin = !this.isLogin;
        },
        submitForm() {
            if (this.isLogin) {
                const admin = adminService.getAdmin();
                if (this.credentials.email === admin.email && this.credentials.password === admin.password) {
                    // Save login status in localStorage
                    storageService.save('isAdminLoggedIn', true);
                    this.$emit('loginAdmin'); // Emit event to the parent
                    alert('Admin logged in successfully!');
                    this.$router.push('/'); // Redirect to home page after login
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            }
        }
    }
};
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