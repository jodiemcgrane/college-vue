<!--
@Date:   2021-03-08T12:13:19+00:00
@Last modified time: 2021-03-10T10:02:01+00:00
-->
<template>
<div class="lecturers-index">

  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group>
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <div class="d-flex">
        <b-form-input type="search" v-model="keyword" @input="searchLecturer()" v-on:keyup.enter="searchLecturer()" placeholder="Search lecturer by name"></b-form-input>
        <b-button class="float-right ml-2" variant="primary" @click="searchLecturer()">Search</b-button>
      </div>
    </b-col>
  </b-row>

  <b-table id="lecturers-table" hover :items="lecturers" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
    <template #cell(actions)="data">

      <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">
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
  name: 'LecturersIndex',
  components: {

  },
  data() {
    return {
      fields: [
        'id',
        'name',
        'address',
        'email',
        'phone',
        'actions'
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      lecturers: [],
    }
  },
  mounted() {
    this.getLecturers();
  },
  methods: {
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturers = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
  },
  computed: {
    totalRows() {
      return this.lecturers.length
    }
  },

}
</script>

<style>
</style>
