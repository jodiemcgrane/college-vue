<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-02-18T14:06:15+00:00
-->
<template>
<div>
  <b-button @click="getCourses()" type="submit" variant="primary">Get Courses</b-button>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseIndex',
  components: {
  },
  data() {
    return {

    }
  },
  // mounted() {
  //   this.getCourses();
  // },
  methods: {
    getCourses() {
      let token = localStorage.getItem('token')

      axios.get('http://college.api:8000/api/courses', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
  },
}
</script>

<style>

</style>
