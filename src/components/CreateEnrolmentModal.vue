<!--
@Date:   2021-03-16T19:00:03+00:00
@Last modified time: 2021-04-20T23:16:44+01:00
-->
<template>
<div>
  <b-modal id="createEnrolmentModal" ref="createEnrolmentModal" centered title="Add an Enrolment" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="12">
        <b-form>
          <b-form-group label="Date">
            <input class="form-control" type="date" v-model="form.date">
          </b-form-group>

          <b-form-group label="Time">
            <input class="form-control" type="time" v-model="form.time">
          </b-form-group>

          <b-form-group label="Status">
            <b-row>
              <b-col md="12">
                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
                </b-button>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group label="Course Name">
            <b-form-select v-model="selectedCourse">
              <option v-for="course in courses" :value="course.id" :key="course.id">{{ course.title }}</option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Lecturer Name">
            <b-form-select v-model="selectedLecturer">
              <option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id">{{ lecturer.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createEnrolment(); hide();" pill variant="primary">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CreateCourseModal',
  components: {

  },
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: ""
      },
      courses: [],
      lecturers: [],
      selectedCourse: "",
      selectedLecturer: "",
    }
  },
  mounted() {
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    show() {
      this.$refs.createEnrolmentModal.show();
    },
    hide() {
      this.$refs.createEnrolmentModal.hide();
    },
    getEnrolments() {
      this.$emit("get-enrolments");
    },
    createEnrolment() {
      let token = localStorage.getItem('token');
      axios.post('/enrolments', {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.selectedCourse,
          lecturer_id: this.selectedLecturer
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$refs.createEnrolmentModal.hide();
          this.$emit("get-enrolments");
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.courses = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturers = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
  }
}
</script>

<style scoped>
.submit-button {
  width: 20%;
}

.description-box {
  height: 100%;
  width: 360px;
}

.modal-backdrop {
  display: none;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

legend {
  font-weight: 500;
}
</style>
