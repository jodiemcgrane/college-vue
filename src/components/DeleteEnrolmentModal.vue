<!--
@Date:   2021-03-24T16:50:35+00:00
@Last modified time: 2021-04-13T14:59:02+01:00
-->
<template>
<div class="delete-enrolment-modal">
  <b-modal id="deleteEnrolmentModal" ref="deleteEnrolmentModal" centered title="Delete Enrolment" header-bg-variant="danger" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col>
        <div class="text-center">
          <h5 class="mt-2 mb-4"><b>You are about to delete this enrolment</b></h5>
          <h6>This enrolment will be deleted from the college system.</h6>
          <h6 class="mb-4">Are you sure?</h6>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center mb-5">
      <b-icon icon="trash" class="red-border border-danger rounded p-2" font-scale="6" variant="danger"></b-icon>
    </b-row>

    <b-row class="justify-content-center">
        <b-button class="delete-modal-button" @click="hide();" variant="light">Cancel</b-button>
        <b-button class="cancel-modal-button" @click="deleteEnrolment(); hide();" variant="danger">Delete</b-button>
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
          this.$router.replace({
            name: 'enrolments_index'
          });
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
.red-border {
  border: 4px solid #df4759 !important;
}

.delete-modal-button {
  width: 90px;
}

.cancel-modal-button {
  width: 90px;
}
</style>
