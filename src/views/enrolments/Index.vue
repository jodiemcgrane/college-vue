<!--
@Date:   2021-02-26T19:48:08+00:00
@Last modified time: 2021-03-02T09:56:32+00:00
-->
<template>
<div class="enrolments">
  <b-row>
    <b-table head-variant="light" responsive hover :items="enrolments" :fields="fields">
      <!-- for courses show -->
      <template #cell(title)="data">
        {{ data.item.course_id }}
      </template>
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
      fields: [
        'id',
        'date',
        'time',
        'status',
        'course_id',
        'lecturer_id',
        'Actions'
      ],
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
