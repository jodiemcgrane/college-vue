<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-04-20T13:47:16+01:00
-->
<template>
<div>
  <NavBar :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />

  <div class="content">
    <b-container>
      <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
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

.center {
  margin: auto;
  width: 50%;
}

.right {
  text-align: right;
}

.left {
  text-align: left;
}

/* a.router-link-active, a.router-link-active:hover {
  color: #fff;
  text-decoration: none;
} */

</style>
