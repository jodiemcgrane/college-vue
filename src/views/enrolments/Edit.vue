<!--
@Date:   2021-03-20T14:26:09+00:00
@Last modified time: 2021-04-10T15:26:34+01:00
-->
<template lang="html">
  <div class="enrolments-edit">

    <b-row class="justify-content-center">
      <b-col md="12">
      <router-link to="/enrolments">
        <div v-b-hover="handleHover">
          <div class="d-flex">
            <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #383f45"></b-icon>
            <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #212529"></b-icon>
            <span>
              <div  class="heavy" style="color: #212529">
                Back to Enrolments
              </div>
            </span>
          </div>
        </div>
      </router-link>
    </b-col>
    </b-row>

    <b-row class="mt-5 justify-content-center">
      <b-col md="10">

        <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <b-card class="edit-enrolments-card">

          <b-row class="mb-5">
            <b-col md="8" class="my-1">
                <h3>Edit Enrolment: ID {{ this.$route.params.id }}</h3>
                <div class="border-bottom-black"></div>
            </b-col>
          </b-row>

          <b-row class="justify-content-center">
            <b-col md="10">
        <b-form>

          <b-form-group label="Course Name">
            <b-form-select v-model="form.course_id">
              <option v-for="course in courses" :value="course.id" :key="course.id">{{ course.title }}</option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Lecturer Name">
            <b-form-select v-model="form.lecturer_id">
              <option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id">{{ lecturer.name }}</option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Date">
            <input class="form-control" type="date" v-model="form.date">
          </b-form-group>

          <b-form-group label="Time">
            <input class="form-control" type="time" v-model="form.time">
          </b-form-group>

          <b-form-group label="Status">
            <b-row class="heavy justify-content-center">
            <b-form-radio class="mr-4" v-model="form.status" value="assigned">Assigned</b-form-radio>
            <b-form-radio class="mr-4" v-model="form.status" value="associate">Associate</b-form-radio>
            <b-form-radio class="mr-4" v-model="form.status" value="career_break">Career Break</b-form-radio>
            <b-form-radio class="mr-4" v-model="form.status" value="interested">Interested</b-form-radio>
          </b-row>
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>

        <b-row class="justify-content-center mt-4">
          <b-button @click="updateEnrolment()" class="update-pill-button heavy" pill variant="warning">UPDATE</b-button>
        </b-row>

      </b-card>
      </b-overlay>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'EnrolmentsEdit',
  components: {

  },
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },
      courses: [],
      lecturers: [],
      isHovered: false,
      show: false,
      errors: {}
    }
  },
  mounted() {
    this.getEnrolment();
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    getEnrolment() {
      let token = localStorage.getItem('token');

      this.show = true;

      axios.get(`/enrolments/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.form.date = response.data.data.date;
          this.form.time = response.data.data.time;
          this.form.status = response.data.data.status;
          this.form.course_id = response.data.data.course_id;
          this.form.lecturer_id = response.data.data.lecturer_id;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
        .finally(() => {
          this.show = false;
        });
    },
    updateEnrolment() {
      let token = localStorage.getItem('token');

      axios.put(`/enrolments/${this.$route.params.id}`, {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.form.course_id,
          lecturer_id: this.form.lecturer_id
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'enrolments_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
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
  },
}
</script>

<style>
.edit-enrolments-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.heavy {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
