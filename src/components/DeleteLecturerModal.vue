<!--
@Date:   2021-03-23T10:18:03+00:00
@Last modified time: 2021-03-24T17:13:50+00:00
-->
<template>
<div class="delete-lecturer-modal">
  <b-modal id="deleteLecturerModal" ref="deleteLecturerModal" centered title="Delete a Lecturer" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">
    <b-row>
      <h5>Are you sure you wish to delete this lecturer?</h5>
      <b-button @click="deleteLecturer(); hide();" variant="danger">Delete</b-button>
    </b-row>
  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'DeleteLecturerModal',
  props: {
    lecturerId: Number,
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.$refs.deleteLecturerModal.show();
    },
    hide() {
      this.$refs.deleteLecturerModal.hide();
    },
    deleteLecturer() {
      //console.log(this.lecturerId);
      let token = localStorage.getItem('token');

      axios.delete(`/lecturers/${this.lecturerId}`, {
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
    }
  },
}
</script>

<style>
</style>
