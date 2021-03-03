<!--
@Date:   2021-03-02T09:35:32+00:00
@Last modified time: 2021-03-02T10:32:23+00:00
-->
<template>
<div>
title  <input type="text" v-model="form.title" /> <br>
code  <input type="text" v-model="form.code" /> <br>
descrip  <input type="text" v-model="form.description" /> <br>
points  <input type="text" v-model="form.points" /> <br>
level  <input type="text" v-model="form.level" /> <br>

  <button @click="createCourse()">Create</button>
</div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'CoursesCreate',
  components: {

  },
  date() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      }
    }
  },
  methods: {
    createCourse() {

    }
  },
}
</script>

<style>
</style>
