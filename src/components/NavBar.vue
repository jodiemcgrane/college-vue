<!--
@Date:   2021-02-17T11:32:26+00:00
@Last modified time: 2021-03-10T11:28:57+00:00
-->
<template>
<div>

  <b-navbar class="main-nav" type="dark" variant="primary">

    <b-navbar-nav>
      <b-nav-item to="/home">Home</b-nav-item>
      <b-nav-item to="/courses">Courses</b-nav-item>
      <b-nav-item to="/enrolments">Enrolments</b-nav-item>
      <!-- <b-nav-item :to={name: 'enrolments_index'}>Enrolments</b-nav-item> -->
      <b-nav-item to="/lecturers">Lecturers</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item v-if="loggedIn" @click="logout()" to="/">Logout</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item>
        <Burger></Burger>
      </b-nav-item>

    </b-navbar-nav>

  </b-navbar>

  <Sidebar>
    <ul class="sidebar-panel-nav">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </Sidebar>

</div>
</template>

<script>
import Burger from './menu/Burger.vue';
import Sidebar from './menu/Sidebar.vue';


import axios from 'axios';

export default {
  name: 'NavBar',

  components: {
    Burger,
    Sidebar
  },
  props: {
    loggedIn: Boolean,
  },
  methods: {
    logout() {
      let token = localStorage.getItem('token')

      axios.get('http://college.api:8000/api/logout', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          //this.$emit('logout');
          this.$router.replace({
            name: 'welcome'
          });
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
ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.2rem;
   display: block;
   padding-bottom: 0.5em;
 }

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }


</style>
