<!--
@Date:   2021-03-16T19:54:35+00:00
@Last modified time: 2021-04-20T22:38:09+01:00
-->
<template>
<div>
  <b-modal id="createLecturerModal" ref="createLecturerModal" centered title="Add a Lecturer" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

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
            <b-form-input type="email" v-model="form.email" />
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createLecturer(); hide();" pill variant="primary">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CreateLecturerModal',
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
    hide() {
      this.$refs.createLecturerModal.hide();
    },
    getLecturers() {
      this.$emit("get-lecturers");
    },
    createLecturer() {
      let token = localStorage.getItem('token');
      axios.post('/lecturers', {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          email: this.form.email,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$refs.createLecturerModal.hide();
          this.$emit("get-courses");
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
</style>
