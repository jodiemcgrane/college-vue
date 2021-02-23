<!--
@Date:   2021-02-17T11:32:26+00:00
@Last modified time: 2021-02-23T10:25:44+00:00
-->
<template>
<div>
  <b-navbar type="dark" variant="primary">
    <b-navbar-nav>
      <b-nav-item to="/home">Home</b-nav-item>
      <b-nav-item to="/courses">Courses</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item @click="logout()" to="/">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NavBar',

  methods: {
    logout() {
      let token = localStorage.getItem('token')

      axios.get('http://college.api:8000/api/logout', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        console.log(response.data);
        this.$router.replace({ name: 'home'});
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
      localStorage.removeItem('token');
    }
  },
}
</script>

<style>

</style>
