<!--
@Date:   2021-02-26T19:48:08+00:00
@Last modified time: 2021-03-06T13:28:55+00:00
-->
<template>
<div class="enrolments">

  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group horizontal label="Per page" class="mb-0">
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-group>
    </b-col>
  </b-row>

    <b-table hover :items="enrolments" :fields="fields" responsive="sm" :current-page="currentPage" :per-page="perPage">
      <template #cell(actions)="data">

        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">
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
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentsIndex',
  components: {

  },
  data() {
    return {
      fields: [
        'id',
        'date',
        'time',
        'status',
        'course_id',
        'lecturer_id',
        'Actions'
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      enrolments: []
    }
  },
  mounted() {
    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.enrolments = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    }
  },
}
</script>

<style>
</style>
