<!--
@Date:   2021-03-06T13:26:11+00:00
@Last modified time: 2021-03-08T20:53:29+00:00
-->
<template>
<div class="enrolments-show">
  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="10">
      <b-card>
        <div>
          <b-card-text>
            <h2>Enrolment ID: {{ enrolment.id }}</h2>

            <p>Date: {{ enrolment.date }}</p>
            <p>Time: {{ enrolment.time }}</p>
            <p>Status: {{ enrolment.status }}</p>
            <p>Lecturer ID: {{ enrolment.code }}</p>
            <p>Course ID: {{ enrolment.code }}</p>
          </b-card-text>
        </div>
      </b-card>
    </b-col>
  </b-row>

  <b-row class="justify-content-center">
    <b-col class="mt-3" sm="5">
      <b-card>
        <b-card-text>
          <h2>Course ID: {{ enrolment.course.id }}</h2>
          <p>Title: {{ enrolment.course.title }}</p>
          <p>Code: {{ enrolment.course.code }}</p>
          <p>Points: {{ enrolment.course.points }}</p>
          <p>Level: {{ enrolment.course.level }}</p>
        </b-card-text>
      </b-card>
    </b-col>

    <b-col class="mt-3" sm="5">
      <b-card>
        <b-card-text>
          <h2>Lecturer ID: {{ enrolment.lecturer.id }}</h2>
          <p>Name: {{ enrolment.lecturer.name }}</p>
          <p>E-mail: {{ enrolment.lecturer.email }}</p>
          <p>Phone No: {{ enrolment.lecturer.phone }}</p>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
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
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
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

<style scoped>
.card {
  height: 100%;
}

</style>
