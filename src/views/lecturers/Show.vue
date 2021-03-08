<!--
@Date:   2021-03-08T12:13:24+00:00
@Last modified time: 2021-03-08T12:28:28+00:00
-->
<template>
  <div class="lecturers-show">
    <h4>ID: </h4> {{ lecturer.id }} <br>
    <h4>Name: </h4> {{ lecturer.name }} <br>
    <h4>Address: </h4> {{ lecturer.address }} <br>
    <h4>E-mail: </h4> {{ lecturer.email }} <br>
    <h4>Phone No: </h4> {{ lecturer.phone }} <br>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturersShow',
  components: {

  },
  data() {
    return {
      lecturer: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.lecturer = response.data.data;

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
