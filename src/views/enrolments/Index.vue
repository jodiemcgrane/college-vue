<!--
@Date:   2021-02-26T19:48:08+00:00
@Last modified time: 2021-03-18T15:15:25+00:00
-->
<template>
<div class="enrolments">

  <b-row>
    <b-button @click="showModal()" pill variant="primary">Create</b-button>
  </b-row>

  <CreateEnrolmentModal ref="CreateEnrolmentModal" />

  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group>
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-group>
    </b-col>
  </b-row>

    <b-table id="enrolments-table" hover :items="enrolments" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
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

    <b-row class="justify-content-center">
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="courses-table"></b-pagination>
    </b-row>

</div>
</template>

<script>
import CreateEnrolmentModal from '@/components/CreateEnrolmentModal.vue'
import axios from '@/config/api';

export default {
  name: 'EnrolmentsIndex',
  components: {
    CreateEnrolmentModal,
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
    showModal() {
      this.$refs.CreateEnrolmentModal.show();
    },
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('/enrolments', {
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
  computed: {
    totalRows() {
      return this.enrolments.length
    }
  },
}
</script>

<style>
</style>
