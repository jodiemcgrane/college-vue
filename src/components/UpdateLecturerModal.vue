<!--
@Date:   2021-03-27T13:37:46+00:00
@Last modified time: 2021-03-27T14:02:55+00:00
-->
<template>
<div>
  <b-modal id="updateLecturerModal" ref="updateLecturerModal" centered title="Edit Lecturer" header-bg-variant="warning" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="12">
        <b-form>

          <b-form-group label="Name">
            <b-form-input type="text" v-model="updateLecturerData.name" />
          </b-form-group>

          <b-form-group label="Address">
            <b-form-input type="text" v-model="updateLecturerData.address" />
          </b-form-group>

          <b-form-group label="Phone">
            <b-form-input type="text" v-model="updateLecturerData.phone" />
          </b-form-group>

          <b-form-group label="Email">
            <b-form-input type="email" v-model="updateLecturerData.email" />
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="updateLecturer(); hide();" pill variant="warning">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'UpdateLecturerModal',
  props: {
    updateLecturerData: {
      type: Object
    }
  },
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.$refs.updateLecturerModal.show();
    },
    hide() {
      this.$refs.updateLecturerModal.hide();
    },
    updateLecturer() {
      let token = localStorage.getItem('token');

      axios.put(`/lecturers/${this.updateLecturerData.id}`, {
          name: this.updateLecturerData.name,
          address: this.updateLecturerData.address,
          email: this.updateLecturerData.email,
          phone: this.updateLecturerData.phone,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'lecturers_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>

<style>
.submit-button {
  width: 20%;
}
</style>
