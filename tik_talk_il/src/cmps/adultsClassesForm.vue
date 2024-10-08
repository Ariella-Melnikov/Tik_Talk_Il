<template>
    <div v-if="open" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <button type="button" class="close-button" @click="closeModal">✕</button>
            <h1>{{ $t('form.adultTitle') }}</h1>
            <p>{{ $t('form.adultSubtitle') }}</p>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">{{ $t('form.fullName') }}:</label>
                    <input type="text" id="name" v-model="form.fullName" required />
                </div>
                <div class="form-group">
                    <label for="email">{{ $t('form.email') }}:</label>
                    <input type="email" id="email" v-model="form.email" required />
                </div>
                <div class="form-group">
                    <label for="phone">{{ $t('form.phoneNumber') }}:</label>
                    <input type="tel" id="phone" v-model="form.phone" required />
                </div>
                <div class="form-group">
                    <label for="courseType">{{ $t('form.courseType') }}:</label>
                    <select id="courseType" v-model="form.courseType" required>
                        <option value="" disabled>{{ $t('form.selectCourseType') }}</option>
                        <option value="business">{{ $t('form.businessCourse') }}</option>
                        <option value="conversational">{{ $t('form.conversationalCourse') }}</option>
                        <option value="academic">{{ $t('form.academicCourse') }}</option>
                    </select>
                </div>
                <div class="form-group subscribe-group">
                    <input type="checkbox" id="subscribe" v-model="form.isSubscribe" />
                    <label for="subscribe">{{ $t('form.subscribe') }}</label>
                </div>
                <button type="submit" class="action-button">{{ $t('form.submit') }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { siteService } from '@/services/site.service.js'

export default {
    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            form: this.getInitialFormState()
        }
    },
    methods: {
        getInitialFormState() {
            return {
                fullName: '',
                email: '',
                phone: '',
                courseType: '',
                isSubscribe: false,
            }
        },
        async submitForm() {
            try {
                await siteService.submitAdultForm(this.form) // Submit the form data via siteService
                alert('Form submitted successfully!')
                this.resetForm() // Reset the form after submission
                this.$emit('close') // Close the modal
            } catch (error) {
                alert('Failed to submit form. Please try again.')
            }
        },
        closeModal() {
            this.resetForm() // Reset the form when the modal is closed
            this.$emit('close') // Emit an event to close the modal
        },
        resetForm() {
            this.form = this.getInitialFormState() // Reset the form data
        }
    },
}
</script>

<style lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1001;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #ff6b6b;

    &:hover {
        color: #ff4d4d;
    }
}

.form-group {
    margin-bottom: 1.5rem;

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #4c3777;
    }

    input,
    select {
        width: 100%;
        padding: 0.75rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }
}

.subscribe-group {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    input[type='checkbox'] {
        width: auto;
        margin-right: 0.5rem;
    }

    label {
        margin-bottom: 0;
        font-weight: bold;
        color: #4c3777;
    }
}
</style>