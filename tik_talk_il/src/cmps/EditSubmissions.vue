<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <button type="button" class="close-button" @click="closeModal">✕</button>
            <h2>{{ submission._id ? $t('editSubmissions.editTitle') : $t('editSubmissions.addTitle') }}</h2>
            <form @submit.prevent="onSubmit">
                <div v-if="type === 'adult'">
                    <label>{{ $t('form.fullName') }}:</label>
                    <input v-model="form.fullName" type="text" required />

                    <label>{{ $t('form.email') }}:</label>
                    <input v-model="form.email" type="email" required />

                    <label>{{ $t('form.phoneNumber') }}:</label>
                    <input v-model="form.phone" type="tel" required />

                    <div class="form-group">
                        <label for="courseType">{{ $t('form.courseType') }}:</label>
                        <select id="courseType" v-model="form.courseType" required>
                            <option value="" disabled>{{ $t('form.selectCourseType') }}</option>
                            <option value="business">{{ $t('form.businessCourse') }}</option>
                            <option value="conversational">{{ $t('form.conversationalCourse') }}</option>
                            <option value="academic">{{ $t('form.academicCourse') }}</option>
                        </select>
                    </div>
                </div>

                <div v-else>
                    <label>{{ $t('form.parentFullName') }}:</label>
                    <input v-model="form.parentFullName" type="text" required />

                    <label>{{ $t('form.parentEmail') }}:</label>
                    <input v-model="form.parentEmail" type="email" required />

                    <label>{{ $t('form.parentPhoneNumber') }}:</label>
                    <input v-model="form.parentPhone" type="tel" required />

                    <label>{{ $t('form.kidsAge') }}:</label>
                    <input v-model="form.kidsAge" type="number" min="1" required />
                </div>

                <div class="form-group subscribe-group">
                    <input type="checkbox" id="subscribe" v-model="form.isSubscribe" />
                    <label for="subscribe">{{ $t('form.subscribe') }}</label>
                </div>
                <button type="submit">
                    {{ submission._id ? $t('editSubmissions.saveChanges') : $t('editSubmissions.addSubmission') }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        submission: {
            type: Object,
            default: () => ({
                fullName: '',
                email: '',
                phone: '',
                courseType: '',
                parentFullName: '',
                parentEmail: '',
                parentPhone: '',
                kidsAge: '',
                isSubscribe: false,
            }),
        },
        type: {
            type: String,
            required: true, // 'adult' or 'kids'
        },
    },
    data() {
        return {
            form: { ...this.submission }, // Clone the submission to avoid directly mutating the prop
        }
    },
    methods: {
        onSubmit() {
            this.$emit('save', this.form) // Emit the form data to the parent component
        },
        closeModal() {
            this.$emit('close') // Emit a close event to the parent component
        },
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
}

.modal {
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    width: 400px;
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
</style>
