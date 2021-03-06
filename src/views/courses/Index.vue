<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-06T13:23:54+00:00
-->
<template>
<div class="courses">

  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group horizontal label="Per page" class="mb-0">
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-group>
    </b-col>
  </b-row>

  <b-table id="courses-table" hover :items="courses" :fields="fields" responsive="sm" :current-page="currentPage" :per-page="perPage">
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
    <b-pagination :per-page="perPage" v-model="currentPage" class="my-0" aria-controls="courses-table" />
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
  },
}
</script>

<style>
.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}

.card h4 {
  font-weight: 600;
}

.card-1 {
  background-repeat: no-repeat;
  background-position: right;
  background-size: 80px;
}

table.table-hover tbody tr:hover {
  background-color: #cfe2ff;
}
</style>
