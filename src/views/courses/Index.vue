<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-03T14:02:07+00:00
-->
<template>
<div class="courses">

  <b-table striped hover :items="courses" :fields="fields">
    <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template>
  </b-table>

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
      fields: [
        'title', 'code', 'points', 'level'
      ],
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
