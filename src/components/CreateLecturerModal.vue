<!--
@Date:   2021-03-16T19:54:35+00:00
@Last modified time: 2021-03-16T19:58:38+00:00
-->
<template>
<div>
  <b-modal id="createLecturerModal" ref="createLecturerModal" centered title="Create a Lecturer" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="12">
        <b-form>
          
          <b-form-group label="Name">
            <b-form-input type="text" v-model="form.name" />
          </b-form-group>

          <b-form-group label="Address">
            <b-form-input type="text" v-model="form.address" />
          </b-form-group>

          <b-form-group label="Phone">
            <b-form-input type="text" v-model="form.phone" />
          </b-form-group>

          <b-form-group label="Email">
            <b-form-input v-model="form.email" />
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createLecturer()" pill variant="primary">Submit</b-button>
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
        name: "",
        address: "",
        phone: "",
        email: "",
      },
    }
  },
  methods: {
    show() {
      this.$refs.createLecturerModal.show();
    },
    createLecturer() {
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
