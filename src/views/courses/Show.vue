<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-03T13:57:57+00:00
-->
<template>
<div>
  <h4>Title: </h4> {{ course.title }} <br>
  <h4>Code: </h4> {{ course.code }} <br>
  <h4>Description: </h4> {{ course.description }} <br>
  <h4>Points: </h4> {{ course.points }} <br>
  <h4>Level: </h4> {{ course.level }} <br>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CoursesShow',
  components: {
  },
  data() {
    return {
      course: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.course = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
}
</script>

<style>
</style>
