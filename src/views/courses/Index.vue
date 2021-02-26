<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-02-26T21:07:54+00:00
-->
<template>
<div class="courses">
  <b-row>
    <b-col md="6">
      <b-card class="card-1 mb-3" v-for="course in courses" :key="course.id">

        <h4 class="text-left mt-3 mb-3">
          {{course.title}}
        </h4>
        <p><strong>Code: </strong>{{ course.code }}</p>
        <p class="mt-3 mb-3">{{ course.description }}</p>

        <div class="d-flex">
          <p><strong>Level: </strong>{{ course.level }}</p>
          <span class="ml-auto">
            <p><strong>Points: </strong>{{ course.points }}</p>
          </span>
        </div>
        <p><strong>Enrolments: <router-link :to="{ name: 'enrolments_index'}">View All</router-link></strong></p>

      </b-card>
    </b-col>
  </b-row>

  <b-table striped hover :courses="courses"></b-table>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CoursesIndex',
  components: {

  },
  data() {
    return {
      courses: []
    }
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.courses = response.data.data;
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
.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}

.card h4 {
  font-weight: 600;
}

.card-1 {
  background-repeat: no-repeat;
  background-position: right;
  background-size: 80px;
}
</style>
