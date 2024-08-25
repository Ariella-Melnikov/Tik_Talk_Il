<template>
    <div v-if="open" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <button type="button" class="close-button" @click="closeModal">✕</button>
            <h1>{{ $t('form.title') }}</h1>
            <p>{{ $t('form.subtitle') }}</p>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">{{ $t('form.parentFullName') }}:</label>
                    <input type="text" id="name" v-model="form.name" required />
                </div>
                <div class="form-group">
                    <label for="email">{{ $t('form.parentEmail') }}:</label>
                    <input type="email" id="email" v-model="form.email" required />
                </div>
                <div class="form-group">
                    <label for="phone">{{ $t('form.parentPhoneNumber') }}:</label>
                    <input type="tel" id="phone" v-model="form.phone" required />
                </div>
                <div class="form-group">
                    <label for="kidsAge">{{ $t('form.kidsAge') }}:</label>
                    <input type="number" id="kidsAge" v-model="form.kidsAge" min="1" required />
                </div>
                <!-- <div class="form-group">
                        <label for="course">{{ $t('form.course') }}:</label>
                        <select id="course" v-model="form.course" required>
                            <option value="" disabled>{{ $t('form.selectCourse') }}</option>
                            <option value="women">{{ $t('form.womenCourse') }}</option>
                            <option value="kids">{{ $t('form.kidsCourse') }}</option>
                            <option value="business">{{ $t('form.businessCourse') }}</option>
                        </select>
                    </div> -->
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
export default {
    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            form: {
                parentFullName: '',
                parentEmail: '',
                parentPhone: '',
                kidsAge: '',
                isSubscribe: false,
            },
        }
    },
   methods: {
    async submitForm() {
      const formData = new FormData();
      formData.append('entry.1564799628', this.form.parentFullName); // Replace with your actual entry ID for Name
      formData.append('entry.1636229087', this.form.parentEmail); // Replace with your actual entry ID for Email
      formData.append('entry.250051217', this.form.parentPhone); // Replace with your actual entry ID for Phone
      formData.append('entry.427496753', this.form.kidsAge); // Replace with your actual entry ID for Kid's Age
      formData.append('entry.255221397', this.form.isSubscribe ? 'Yes' : 'No'); // Replace with your actual entry ID for Subscribe

      try {
        await axios.post('https://docs.google.com/forms/d/e/your-google-form-id/formResponse', formData);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form.');
      }

      this.$emit('close'); // Emit an event to close the modal
    },
    closeModal() {
      this.$emit('close'); // Emit an event to close the modal
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
