<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-02-19T16:16:57+00:00
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
.content {
  padding: 2rem;
}
</style>
