<!--
@Date:   2021-03-16T19:00:03+00:00
@Last modified time: 2021-03-16T19:54:54+00:00
-->
<template>
<div>
  <b-modal id="createEnrolmentModal" ref="createEnrolmentModal" centered title="Create an Enrolment" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="12">
        <b-form>
          <b-form-group>
            <b-form-datepicker v-model="form.date" />
          </b-form-group>

          <b-form-group>
            <b-form-timepicker v-model="form.time" />
          </b-form-group>

          <b-form-group label="Status">
            <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
            <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
            <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
            <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
          </b-form-group>

          <b-form-group label="Course ID">
            <b-form-select v-model="form.course_id" />
          </b-form-group>

          <b-form-group label="Lecturer ID">
            <b-form-select type="text" v-model="form.lecturer_id" />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createEnrolment()" pill variant="primary">Submit</b-button>
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
    }
  },
  methods: {
    show() {
      this.$refs.createEnrolmentModal.show();
    },
    createEnrolment() {
      let token = localStorage.getItem('token');
      axios.post('/enrolments', {
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
  background: rgba(0,0,0,0.5);
}
</style>
