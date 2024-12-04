<template>
    <div class="sessions-admin">
        <h2>Course and Class Management</h2>


        <div v-if="isLoading" class="loading">Loading courses and classes...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <table v-if="courses.length">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Course Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course._id">
                        <td>{{ course.courseName }}</td>
                        <td>{{ course.courseType }}</td>
                        <td>{{ course.startDate }}</td>
                        <td>{{ course.endDate }}</td>
                        <td>{{ course.price }}₪</td>
                        <td>
                            <button @click="editCourse(course)" class="edit-button">
                                Edit
                            </button>
                            <button @click="handleDelete(course._id)" class="delete-button">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="no-courses">No courses available. Add some courses to get started.</div>
        </div>

        <button @click="showAddCourseModal = true" class="add-button">Add New Course</button>

        <div v-if="selectedCourse" class="class-section">
            <h3>Classes for {{ selectedCourse.courseName }}</h3>
            <button @click="showAddClassModal = true" class="add-btn">Add New Class</button>

            <table class="class-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Max Students</th>
                        <th>Current Students</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classItem in selectedCourseClasses" :key="classItem.id">
                        <td>{{ formatDate(classItem.date) }}</td>
                        <td>{{ classItem.price }}₪</td>
                        <td>{{ classItem.maxStudents }}</td>
                        <td>{{ classItem.currentStudents }}</td>
                        <td>{{ classItem.status.join(', ') }}</td>
                        <td>
                            <button @click="editClass(classItem)" class="edit-btn">Edit</button>
                            <button @click="deleteClass(classItem.id)" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Course Modal -->
        <div v-if="showAddCourseModal || showEditCourseModal" class="modal-overlay" @click="closeCourseModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>{{ showEditCourseModal ? 'Edit Course' : 'Add New Course' }}</h3>
                    <button class="close-btn" @click="closeCourseModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="showEditCourseModal ? updateCourse() : addCourse()">
                        <div class="form-group">
                            <label for="courseName">Course Name:</label>
                            <input v-model="courseForm.courseName" type="text" id="courseName" required />
                        </div>
                        <div class="form-group">
                            <label for="courseType">Course Type:</label>
                            <select v-model="courseForm.courseType" id="courseType" required>
                                <option value="General English">General English</option>
                                <option value="Business English">Business English</option>
                                <option value="Kids English">Kids English</option>
                                <option value="English for Women">English for Women</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="startDate">Start Date:</label>
                            <input v-model="courseForm.startDate" type="date" id="startDate" required />
                        </div>
                        <div class="form-group">
                            <label for="endDate">End Date:</label>
                            <input v-model="courseForm.endDate" type="date" id="endDate" required />
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input v-model.number="courseForm.price" type="number" id="price" required />
                        </div>
                        <button type="submit" class="submit-btn">
                            {{ showEditCourseModal ? 'Update' : 'Add' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Class Modal -->
        <div v-if="showAddClassModal || showEditClassModal" class="modal-overlay" @click="closeClassModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>{{ showEditClassModal ? 'Edit Class' : 'Add New Class' }}</h3>
                    <button class="close-btn" @click="closeClassModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="showEditClassModal ? updateClass() : addClass()">
                        <div class="form-group">
                            <label for="date">Date:</label>
                            <input v-model="classForm.date" type="date" id="date" required />
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input v-model.number="classForm.price" type="number" id="price" required />
                        </div>
                        <div class="form-group">
                            <label for="maxStudents">Max Students:</label>
                            <input v-model.number="classForm.maxStudents" type="number" id="maxStudents" min="1" required />
                        </div>
                        <button type="submit" class="submit-btn">
                            {{ showEditClassModal ? 'Update' : 'Add' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'SessionsAdmin',
    data() {
        return {
            showAddCourseModal: false,
            showEditCourseModal: false,
            showAddClassModal: false,
            showEditClassModal: false,
            courseForm: {
                courseName: '',
                courseType: '',
                startDate: '',
                endDate: '',
                price: 0
            },
            classForm: {
                date: '',
                price: 0,
                maxStudents: 1
            },
            selectedCourse: null
        }
    },
    computed: {
        ...mapState('sessions', ['courses', 'isLoading', 'error']),
        ...mapGetters('sessions', ['selectedCourseClasses'])
    },
    methods: {
        async loadCourses() {
            try {
                await this.$store.dispatch('sessions/loadAllCourses')
            } catch (error) {
                console.error('Failed to load courses:', error)
                this.$toast?.error?.(error.message || 'Failed to load courses')
            }
        },
        addCourse() {
            this.$store.dispatch('sessions/createCourse', this.courseForm)
                .then(() => {
                    this.$toast.success('Course added successfully')
                    this.closeCourseModal()
                    this.loadCourses()
                })
                .catch(error => {
                    console.error('Failed to add course:', error)
                    this.$toast.error('Failed to add course')
                })
        },
        editCourse(course) {
            this.selectedCourse = course
            this.courseForm = { ...course }
            this.showEditCourseModal = true
        },
        updateCourse() {
            this.$store.dispatch('sessions/updateCourse', { courseId: this.selectedCourse.id, courseData: this.courseForm })
                .then(() => {
                    this.$toast.success('Course updated successfully')
                    this.closeCourseModal()
                    this.loadCourses()
                })
                .catch(error => {
                    console.error('Failed to update course:', error)
                    this.$toast.error('Failed to update course')
                })
        },
        deleteCourse(courseId) {
            // Implement delete course logic
        },
        closeCourseModal() {
            this.showAddCourseModal = false
            this.showEditCourseModal = false
            this.courseForm = {
                courseName: '',
                courseType: '',
                startDate: '',
                endDate: '',
                price: 0
            }
        },
        addClass() {
            this.$store.dispatch('sessions/createClass', { courseId: this.selectedCourse.id, classData: this.classForm })
                .then(() => {
                    this.$toast.success('Class added successfully')
                    this.closeClassModal()
                    this.loadCourses()
                })
                .catch(error => {
                    console.error('Failed to add class:', error)
                    this.$toast.error('Failed to add class')
                })
        },
        editClass(classItem) {
            this.classForm = { ...classItem }
            this.showEditClassModal = true
        },
        updateClass() {
            this.$store.dispatch('sessions/updateClass', { classId: this.classForm.id, classData: this.classForm })
                .then(() => {
                    this.$toast.success('Class updated successfully')
                    this.closeClassModal()
                    this.loadCourses()
                })
                .catch(error => {
                    console.error('Failed to update class:', error)
                    this.$toast.error('Failed to update class')
                })
        },
        deleteClass(classId) {
            // Implement delete class logic
        },
        closeClassModal() {
            this.showAddClassModal = false
            this.showEditClassModal = false
            this.classForm = {
                date: '',
                price: 0,
                maxStudents: 1
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
    created() {
        this.loadCourses()
    }
}
</script>

<style lang="scss">
.sessions-admin {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;

    h2, h3 {
        color: #4c3777;
        margin-bottom: 20px;
    }

    .add-btn {
        background-color: #4c3777;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 20px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #3b2c6a;
        }
    }

    .course-table, .class-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;

        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #0e0c0c;
        }
    }

    .edit-btn, .delete-btn {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s;
        margin-right: 5px;

        &.edit-btn {
            background-color: #4c3777;
            color: white;

            &:hover {
                background-color: #3b2c6a;
            }
        }

        &.delete-btn {
            background-color: #ff4444;
            color: white;

            &:hover {
                background-color: #cc0000;
            }
        }
    }

    .loading {
        text-align: center;
        padding: 30px;
        color: #666;
        font-style: italic;
    }

    .form-group {
        margin-bottom: 15px;

        label {
            display: block;
            margin-bottom: 5px;
            color: #4c3777;
        }

        input, select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;

            &:focus {
                outline: none;
                border-color: #4c3777;
            }
        }
    }

    .submit-btn {
        background-color: #4c3777;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.3s;

        &:hover {
            background-color: #3b2c6a;
        }
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    h3 {
        margin: 0;
        color: #4c3777;
    }
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    margin: 0;
    line-height: 1;

    &:hover {
        color: #4c3777;
    }
}

.add-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.7rem 1.5rem;
    background-color: #7a63a8;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2d2a6c;
    }
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    th, td {
        padding: 0.75rem;
        text-align: center;
        border: 1px solid #ccc;
    }

    th {
        background-color: #548cc0;
        color: #fff;
        font-weight: 600;
        text-transform: uppercase;
    }
}

.edit-button, .delete-button {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
}

.edit-button {
    background-color: #4c3777;
    color: white;
    &:hover {
        background-color: #2d2a6c;
    }
}

.delete-button {
    background-color: #dc3545;
    color: white;
    &:hover {
        background-color: #c82333;
    }
}

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
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h2 {
        color: #4c3777;
        margin-bottom: 1.5rem;
    }

    .form-group {
        margin-bottom: 1rem;

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 600;
        }

        input, select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;

            &:focus {
                outline: none;
                border-color: #4c3777;
            }
        }
    }

    .save-button, .cancel-button {
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 1rem;
    }

    .save-button {
        background-color: #4c3777;
        color: white;
        &:hover {
            background-color: #2d2a6c;
        }
    }

    .cancel-button {
        background-color: #6c757d;
        color: white;
        &:hover {
            background-color: #5a6268;
        }
    }
}
</style>