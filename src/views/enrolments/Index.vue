<!--
@Date:   2021-02-26T19:48:08+00:00
@Last modified time: 2021-03-01T15:00:20+00:00
-->
<template>
<div class="enrolments">
  <b-row>
    <b-table head-variant="light" responsive hover :items="enrolments" :fields="fields">
    </b-table>
  </b-row>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentsIndex',
  components: {

  },
  data() {
    return {
      fields: ['id', 'date', 'time', 'status', 'course_id', 'lecturer_id', 'Actions'],
      items: [],
      enrolments: []
    }
  },
  mounted() {
    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.enrolments = response.data.data;
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
