<!--
@Date:   2021-03-06T13:26:11+00:00
@Last modified time: 2021-03-08T12:02:29+00:00
-->
<template>
  <div>
    <h4>ID: </h4> {{ enrolment.id }} <br>
    <h4>Date: </h4> {{ enrolment.date }} <br>
    <h4>Time: </h4> {{ enrolment.time }} <br>
    <h4>Status: </h4> {{ enrolment.status }} <br>
    <h4>Course ID: </h4> {{ enrolment.course_id }} <br>
    <h4>Lecturer ID: </h4> {{ enrolment.lecturer_id }} <br>

    <!-- <h4>Lecturer of this enrolment ID: </h4> {{ enrolment.course.id }} <br>
    <h4>Course title of this enrolment: </h4> {{ enrolment.course.title }} <br> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentsShow',
  components: {

  },
  data() {
    return {
      enrolment: {},
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.enrolment = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
}
</script>

<style lang="css" scoped>
</style>
