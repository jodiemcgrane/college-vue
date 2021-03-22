<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-03-22T12:34:38+00:00
-->
<template>
<div>
  <NavBar :loggedIn="loggedIn" v-on:logout="setLoggedOut"/>

  <div class="content">
    <b-container>

      <router-view :loggedIn="loggedIn" v-on:login="setLoggedIn" />

    </b-container>
  </div>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else {
      this.loggedIn = false;
    }
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
    },
    setLoggedOut() {
      this.loggedIn = false;
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

.content {
  padding: 6rem;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.5px;
}

p {
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.5px;
}
</style>
