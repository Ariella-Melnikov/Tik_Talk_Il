<template>
    <div class="session-list">
        <h2>Available Sessions</h2>
        <div class="course-selection">
            <select 
                v-model="selectedCourseType" 
                @change="loadAvailableSessions"
                class="course-select"
            >
                <option value="">Select Course Type</option>
                <option value="General English">General English</option>
                <option value="Business English">Business English</option>
                <option value="Kids English">Kids English</option>
                <option value="English for Women">English for Women</option>
            </select>
        </div>

        <div v-if="isLoading" class="loading">
            Loading sessions...
        </div>

        <ul v-else-if="availableSessions.length" class="session-items">
            <li v-for="session in availableSessions" 
                :key="session.id" 
                class="session-item"
            >
                <div class="session-info">
                    <h3>{{ session.courseName }}</h3>
                    <p>{{ formatDate(session.date) }} at {{ session.time }}</p>
                    <p>Available spots: {{ session.maxStudents - session.currentStudents }}</p>
                    <p>Price: {{ session.price }}₪</p>
                </div>
                <button 
                    @click="registerToSession(session.id)" 
                    :disabled="!canRegister"
                    class="book-btn"
                >
                    Book Session
                </button>
            </li>
        </ul>

        <div v-else class="no-sessions">
            {{ selectedCourseType 
                ? 'No available sessions for the selected course type.' 
                : 'Please select a course type to view available sessions.' 
            }}
        </div>

        <div class="user-sessions" v-if="userSessions.length">
            <h3>Your Upcoming Sessions</h3>
            <ul class="session-items">
                <li v-for="session in userSessions" 
                    :key="session.id"
                    class="session-item"
                >
                    <div class="session-info">
                        <h3>{{ session.courseName }}</h3>
                        <p>{{ formatDate(session.date) }} at {{ session.time }}</p>
                    </div>
                    <button 
                        @click="unregisterFromSession(session.id)"
                        class="cancel-btn"
                    >
                        Cancel Registration
                    </button>
                </li>
            </ul>
        </div>

        <div class="credits-section">
            <p class="credits">Your credits: {{ userCredits }}</p>
            <a href="/purchase-credits" class="purchase-link">
                Purchase more credits
            </a>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'SessionsUser',
    data() {
        return {
            selectedCourseType: '',
        }
    },
    computed: {
        ...mapState({
            user: state => state.users.user,
            isLoading: state => state.sessions.isLoading,
            error: state => state.sessions.error
        }),
        ...mapGetters('sessions', ['availableSessions', 'userSessions']),
        
        userCredits() {
            return this.user?.credits || 0
        },
        canRegister() {
            return this.userCredits > 0 && !this.isLoading
        }
    },
    methods: {
        async loadAvailableSessions() {
            if (!this.selectedCourseType) return
            
            try {
                await this.$store.dispatch('sessions/loadAvailableSessions', this.selectedCourseType)
            } catch (error) {
                console.error('Failed to load sessions:', error)
                this.$toast.error(error.message || 'Failed to load sessions')
            }
        },

        async registerToSession(sessionId) {
            try {
                await this.$store.dispatch('sessions/registerToClass', {
                    classId: sessionId,
                    userId: this.user.id
                })
                
                this.$toast.success('Successfully registered to session')
                
                // Refresh data
                await Promise.all([
                    this.loadAvailableSessions(),
                    this.loadUserSessions(),
                    this.$store.dispatch('users/loadUser', this.user.id)
                ])
            } catch (error) {
                console.error('Failed to register:', error)
                this.$toast.error(error.message || 'Failed to register to session')
            }
        },

        async unregisterFromSession(sessionId) {
            try {
                await this.$store.dispatch('sessions/unregisterFromClass', {
                    classId: sessionId,
                    userId: this.user.id
                })
                
                this.$toast.success('Successfully unregistered from session')
                
                // Refresh data
                await Promise.all([
                    this.loadAvailableSessions(),
                    this.loadUserSessions(),
                    this.$store.dispatch('users/loadUser', this.user.id)
                ])
            } catch (error) {
                console.error('Failed to unregister:', error)
                this.$toast.error(error.message || 'Failed to unregister from session')
            }
        },

        async loadUserSessions() {
            try {
                await this.$store.dispatch('sessions/loadUserSessions', this.user.id)
            } catch (error) {
                console.error('Failed to load user sessions:', error)
                this.$toast.error('Failed to load your sessions')
            }
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString('en-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    },
    async created() {
        if (this.user?.id) {
            await this.loadUserSessions()
        }
    },
    watch: {
        'user.id': {
            immediate: true,
            handler(newId) {
                if (newId) {
                    this.loadUserSessions()
                }
            }
        }
    }
}
</script>

<style lang="scss">
.session-list {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    h2, h3 {
        color: #4c3777;
        margin-bottom: 20px;
    }

    .course-selection {
        margin-bottom: 30px;
    }

    .course-select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        
        &:focus {
            outline: none;
            border-color: #4c3777;
        }
    }

    .session-items {
        list-style: none;
        padding: 0;
    }

    .session-item {
        background: #fff;
        padding: 20px;
        margin-bottom: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: 4px solid #4c3777;

        .session-info {
            h3 {
                margin: 0 0 10px;
                font-size: 18px;
            }

            p {
                margin: 5px 0;
                color: #666;
            }
        }
    }

    .book-btn, .cancel-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    .book-btn {
        background-color: #4c3777;
        color: white;

        &:hover:not(:disabled) {
            background-color: #3b2c6a;
        }
    }

    .cancel-btn {
        background-color: #ff4444;
        color: white;

        &:hover {
            background-color: #cc0000;
        }
    }

    .loading, .no-sessions {
        text-align: center;
        padding: 30px;
        color: #666;
        font-style: italic;
    }

    .credits-section {
        margin-top: 30px;
        padding: 20px;
        background: #f8f8f8;
        border-radius: 8px;
        text-align: center;

        .credits {
            font-size: 18px;
            font-weight: bold;
            color: #4c3777;
            margin-bottom: 10px;
        }

        .purchase-link {
            color: #4c3777;
            text-decoration: none;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .user-sessions {
        margin-top: 40px;
    }
}
</style>