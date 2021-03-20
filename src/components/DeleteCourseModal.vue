<!--
@Date:   2021-03-19T13:48:26+00:00
@Last modified time: 2021-03-20T14:23:11+00:00
-->
<template>
<div class="delete-course-modal">
  <b-modal id="deleteCourseModal" ref="deleteCourseModal" centered title="Delete Course" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">
    <b-row>
      <h5>Are you sure you wish to delete</h5>
      <b-button @click="deleteCourse(id)">Delete</b-button>
    </b-row>
  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'DeleteCourseModal',
  components: {

  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    deleteCourse() {
      let token = localStorage.getItem('token');

      axios.delete(`/courses/${this.ID}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
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
</style>
