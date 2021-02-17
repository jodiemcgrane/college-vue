<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-02-17T11:33:48+00:00
-->
<template>
<div>
  <NavBar />
  <b-container>
    <b-row>
      <router-view />
    </b-row>
  </b-container>
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

</style>
