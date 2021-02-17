<!--
@Date:   2021-02-17T11:01:49+00:00
@Last modified time: 2021-02-17T11:12:34+00:00
-->
<template>
<div>
  <MyNavBar />
  <b-container>
    <b-row>
      <router-view />
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>

</style>
