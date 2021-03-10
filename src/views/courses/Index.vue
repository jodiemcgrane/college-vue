<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-10T10:01:34+00:00
-->
<template>
<div class="courses-index">

  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group>
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <div class="d-flex">
        <b-form-input type="search" v-model="keyword" @input="searchCourse()" v-on:keyup.enter="searchCourse()" placeholder="Search course by title"></b-form-input>
        <b-button class="float-right ml-2" variant="primary" @click="searchCourse()">Search</b-button>
      </div>
    </b-col>
  </b-row>

  <b-table id="courses-table" hover :items="courses" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
    <template #cell(actions)="data">

      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">
        <b-button class="mr-2" variant="primary" size="sm">
          <b-icon icon="arrow-right-square" font-scale="1.3" style="color: #fff"></b-icon>
        </b-button>
      </router-link>

      <b-button class="mr-2" variant="warning" size="sm">
        <b-icon icon="pencil-square" font-scale="1.3" style="color: #fff"></b-icon>
      </b-button>

      <b-button variant="danger" size="sm">
        <b-icon icon="trash" font-scale="1.3" style="color: #fff"></b-icon>
      </b-button>

    </template>
  </b-table>

  <b-row class="justify-content-center">
    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="courses-table"></b-pagination>
  </b-row>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CoursesIndex',
  components: {

  },
  data() {
    return {
      fields: [
        'id',
        'title',
        'code',
        'points',
        'level',
        'actions'
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      courses: [],
      keyword: '',
      results: [],
    }
  },
  mounted() {

    if (this.loggedIn) {
      this.getCourses();
    } else {
      //this.$router.push({name: 'welcome'})
    }
  },
  props: {
    loggedIn: Boolean,
  },
  methods: {
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.courses = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    searchCourse() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses/?search=' + this.keyword, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.results = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })

    }
  },
  computed: {
    totalRows() {
      return this.courses.length
    }
  },
}
</script>

<style>
table.table-hover tbody tr:hover {
  background-color: #cfe2ff;
}
</style>
