<!--
@Date:   2021-03-24T16:50:35+00:00
@Last modified time: 2021-03-24T17:13:39+00:00
-->
<template>
<div class="delete-enrolment-modal">
  <b-modal id="deleteEnrolmentModal" ref="deleteEnrolmentModal" centered title="Delete an Enrolment" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">
    <b-row>
      <h5>Are you sure you wish to delete this enrolment?</h5>
      <b-button @click="deleteEnrolment(); hide();" variant="danger">Delete</b-button>
    </b-row>
  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'DeleteEnrolmentModal',
  props: {
    enrolmentId: Number,
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.$refs.deleteEnrolmentModal.show();
    },
    hide() {
      this.$refs.deleteEnrolmentModal.hide();
    },
    deleteEnrolment() {
      console.log(this.enrolmentId);
      let token = localStorage.getItem('token');

      axios.delete(`/enrolments/${this.enrolmentId}`, {
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
