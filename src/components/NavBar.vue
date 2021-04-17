<!--
@Date:   2021-02-17T11:32:26+00:00
@Last modified time: 2021-04-17T19:53:46+01:00
-->
<template>
<div>

  <b-navbar class="main-nav" type="dark" variant="primary">

    <b-navbar-brand v-if="loggedIn" to="home">College System</b-navbar-brand>

    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown v-if="loggedIn" text="User" right>
        <b-dropdown-item @click="logout()" to="/">Logout</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item>
        <Burger v-if="loggedIn"></Burger>
      </b-nav-item>

    </b-navbar-nav>
  </b-navbar>

  <Sidebar v-if="loggedIn">
    <b-nav vertical class="sidebar-panel-nav mb-5">

      <h3 class="ml-3 mb-5" style="color: #fff">Menu</h3>

      <b-nav-item to="/home" class="mt-1 mb-1"><span class="mr-3">
          <b-icon class="mr-3" icon="house" font-scale="1.2" style="color: #fff"></b-icon>
        </span>Home</b-nav-item>

      <b-nav-item to="/courses" class="mt-1 mb-1"><span class="mr-3">
          <b-icon class="mr-3" icon="file-earmark-text" font-scale="1.2" style="color: #fff"></b-icon>
        </span>Courses</b-nav-item>

      <b-nav-item to="/enrolments" class="mt-1 mb-1"><span class="mr-3">
          <b-icon class="mr-3" icon="files" font-scale="1.2" style="color: #fff"></b-icon>
        </span>Enrolments</b-nav-item>

      <b-nav-item to="/lecturers" class="mt-1 mb-1"><span class="mr-3">
          <b-icon class="mr-3" icon="eyeglasses" font-scale="1.2" style="color: #fff"></b-icon>
        </span>Lecturers</b-nav-item>

      <b-nav-item @click="logout()" class="bottom"><span class="mr-3">
          <b-icon class="mr-3" icon="arrow-left" font-scale="1.2" style="color: #fff"></b-icon>
        </span>Sign Out</b-nav-item>

    </b-nav>
  </Sidebar>

</div>
</template>

<script>
import Burger from './menu/Burger.vue';
import Sidebar from './menu/Sidebar.vue';


import axios from '@/config/api';

export default {
  name: 'NavBar',
  props: {
    loggedIn: Boolean
  },
  components: {
    Burger,
    Sidebar
  },
  methods: {
    logout() {
      let token = localStorage.getItem('token')

      axios.get('/logout', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$emit('logout');
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
  padding: 0;
}

ul.sidebar-panel-nav>li>a {
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem;
  display: block;
  padding: 15px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}

ul.sidebar-panel-nav>li:hover {
  background-color: #248DFF;
}

.sidebar-panel-nav>li.bottom {
  margin-top: auto;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
</style>
