<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>{{ submission._id ? 'Edit Submission' : 'Add New Submission' }}</h2>
      <form @submit.prevent="onSubmit">
        <div v-if="type === 'adult'">
          <label>Full Name:</label>
          <input v-model="form.fullName" type="text" required />

          <label>Email:</label>
          <input v-model="form.email" type="email" required />

          <label>Phone Number:</label>
          <input v-model="form.phone" type="tel" required />

          <label>Course Type:</label>
          <input v-model="form.courseType" type="text" required />
        </div>

        <div v-else>
          <label>Parent Full Name:</label>
          <input v-model="form.parentFullName" type="text" required />

          <label>Parent Email:</label>
          <input v-model="form.parentEmail" type="email" required />

          <label>Parent Phone Number:</label>
          <input v-model="form.parentPhone" type="tel" required />

          <label>Child's Age:</label>
          <input v-model="form.kidsAge" type="number" min="1" required />
        </div>

        <label>
          <input type="checkbox" v-model="form.isSubscribe" /> Subscribe to newsletter
        </label>
        <button type="submit">{{ submission._id ? 'Save Changes' : 'Add Submission' }}</button>
      </form>
      <button @click="closeModal">Cancel</button>
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
</style>