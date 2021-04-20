<!--
@Date:   2021-03-19T13:48:26+00:00
@Last modified time: 2021-04-20T22:58:15+01:00
-->
<template>
<div class="delete-course-modal">
  <b-modal id="deleteCourseModal" ref="deleteCourseModal" centered title="Delete Course" header-bg-variant="danger" header-text-variant="light" v-bind:hide-footer="true">
    <b-row>
      <b-col>
        <div class="text-center">
          <h5 class="mt-2 mb-4"><b>You are about to delete this course</b></h5>
          <h6>This course will be deleted from the college system.</h6>
          <h6 class="mb-4">Are you sure?</h6>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center mb-5">
      <b-icon icon="trash" class="red-border border-danger rounded p-2" font-scale="6" variant="danger"></b-icon>
    </b-row>

    <b-row class="justify-content-center">
      <b-button class="delete-modal-button" @click="hide();" variant="light">Cancel</b-button>
      <b-button class="cancel-modal-button" @click="deleteCourse();" variant="danger">Delete</b-button>
    </b-row>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'DeleteCourseModal',
  props: {
    courseId: Number,
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.$refs.deleteCourseModal.show();
    },
    hide() {
      this.$refs.deleteCourseModal.hide();
    },
    getCourses() {
      this.$emit("get-courses");
    },
    deleteCourse() {
      let token = localStorage.getItem('token');

      //console.log(this.courseId);
      axios.delete(`/courses/${this.courseId}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.replace({
            name: 'courses_index'
          });
          this.$refs.deleteCourseModal.hide();
          this.$emit("get-courses");
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },

  },
}
</script>

<style scoped>
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
