<!--
@Date:   2021-03-20T14:26:09+00:00
@Last modified time: 2021-03-27T13:12:39+00:00
-->
<!--
@Date:   2021-03-02T10:01:10+00:00
@Last modified time: 2021-03-27T13:12:39+00:00
-->
<template lang="html">
  <div>
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
            <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
            <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
            <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
            <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
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

    <b-row>
      <b-button @click="updateEnrolment()" pill variant="warning">Update</b-button>
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
      selectedCourse: "",
      selectedLecturer: "",
      errors: {}
    }
  },
  mounted() {
    this.getEnrolment();
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    getEnrolment() {
      let token = localStorage.getItem('token');

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

<style lang="css" scoped>
</style>
