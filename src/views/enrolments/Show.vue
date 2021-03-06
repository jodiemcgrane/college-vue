<!--
@Date:   2021-03-06T13:26:11+00:00
@Last modified time: 2021-03-06T13:31:19+00:00
-->
<template>
  <div>
    {{ enrolment.time }}
    Enrolments show
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
      enrolment: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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

<style lang="css" scoped>
</style>
