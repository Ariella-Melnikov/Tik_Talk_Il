<template>
  <section class="user-page">
    <h1>{{ user.fullName }}</h1>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Course Type:</strong> {{ user.courseType }}</p>

    <h2>Session Dates</h2>
    <ul>
      <li v-for="(session, index) in user.sessions" :key="index">
        {{ session.date }} - {{ session.status === 'completed' ? 'Completed' : 'Upcoming' }}
      </li>
    </ul>
  </section>
</template>

<script>
import { userService } from '@/services/user';

export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    try {
      const userId = this.$route.params.id; // Assuming the URL includes /user/:id
      this.user = await userService.getById(userId);
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  },
};
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