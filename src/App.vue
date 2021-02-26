<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-02-26T19:28:16+00:00
-->
<template>
<div>
  <NavBar />

  <div class="content">
    <b-container>

      <router-view />

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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

.content {
  padding: 6rem;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Roboto", sans-serif;
}
</style>
