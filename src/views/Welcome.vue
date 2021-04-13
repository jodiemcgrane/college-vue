<!--
@Date:   2021-02-23T09:26:27+00:00
@Last modified time: 2021-04-13T10:17:43+01:00
-->
<template>
<div>

  <LoginForm v-on:login="setLoggedIn" />

</div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Welcome',

  components: {
    LoginForm,
  },
  methods: {
    setLoggedIn(){
      this.$emit('login');
    }
  }
}
</script>

<style>

</style>
