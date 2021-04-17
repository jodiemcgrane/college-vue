<!--
@Date:   2021-03-27T12:38:08+00:00
@Last modified time: 2021-04-17T20:33:06+01:00
-->
<template>
<div>
  <b-modal id="updateEnrolmentModal" ref="updateEnrolmentModal" centered title="Edit Enrolment" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="12">
        <b-form>
          <b-form-group label="Date">
            <input class="form-control" type="date" v-model="updateEnrolmentData.date">
          </b-form-group>

          <b-form-group label="Time">
            <input class="form-control" type="time" v-model="updateEnrolmentData.time">
          </b-form-group>

          <b-form-group label="Status">
            <b-row>
              <b-col md="12">
                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="updateEnrolmentData.status" value="assigned">Assigned</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="updateEnrolmentData.status" value="associate">Associate</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="updateEnrolmentData.status" value="career_break">Career Break</b-form-radio>
                </b-button>

                <b-button class="ml-2" pill variant="primary" size="sm">
                  <b-form-radio v-model="updateEnrolmentData.status" value="interested">Interested</b-form-radio>
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
        <b-button class="submit-button mt-1 mb-1" @click="updateEnrolment(); hide();" pill variant="warning">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'UpdateEnrolmentModal',
  props: {
    updateEnrolmentData: {
      type: Object
    }
  },
  components: {

  },
  data() {
    return {
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
      this.$refs.updateEnrolmentModal.show();
    },
    hide() {
      this.$refs.updateEnrolmentModal.hide();
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
    updateEnrolment() {
      let token = localStorage.getItem('token');

      axios.put(`/enrolments/${this.updateEnrolmentData.id}`, {
          date: this.updateEnrolmentData.date,
          time: this.updateEnrolmentData.time,
          status: this.updateEnrolmentData.status,
          course_id: this.updateEnrolmentData.course_id,
          lecturer_id: this.updateEnrolmentData.lecturer_id
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
  }
}
</script>

<style>
.submit-button {
  width: 20%;
}
</style>
