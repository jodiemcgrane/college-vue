<!--
@Date:   2021-03-08T12:13:24+00:00
@Last modified time: 2021-03-18T15:16:08+00:00
-->
<template>
<div class="lecturers-show">
  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="10">
      <b-card>

        <div>
          <b-card-text>
            <h2>Lecturer ID: {{ lecturer.id }}</h2>
            <p>Name: {{ lecturer.name }}</p>
            <p>Address: {{ lecturer.address }}</p>
            <p>E-mail: {{ lecturer.email }}</p>
            <p>Phone No: {{ lecturer.phone }}</p>
          </b-card-text>
        </div>

      </b-card>
    </b-col>
  </b-row>


  <b-row class="justify-content-center">
    <b-col md="10">

      <h5>Enrolments for: {{ lecturer.name }}</h5>

      <b-table id="course-enrolments-table" class="mt-3" hover :items="enrolments" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
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

    </b-col>
  </b-row>

</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LecturersShow',
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
        'Actions'
      ],
      lecturer: {},
      enrolments: []
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`/lecturers/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
        this.lecturer = response.data.data;
        this.enrolments = response.data.data.enrolments

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
  },

}
</script>

<style>
</style>
