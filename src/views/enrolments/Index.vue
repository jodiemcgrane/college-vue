<!--
@Date:   2021-02-26T19:48:08+00:00
@Last modified time: 2021-04-01T14:46:47+01:00
-->
<template>
<div class="enrolments-index">

  <b-row class="mb-2">
    <b-col md="4" class="mb-3">
      <h2>Enrolments</h2>
    </b-col>
    <!-- <b-col md="3 ml-auto">
      <b-breadcrumb>
        <b-breadcrumb-item to="/home">Home</b-breadcrumb-item>
        <b-breadcrumb-item to="/enrolments">Enrolments</b-breadcrumb-item>
      </b-breadcrumb>
    </b-col> -->
  </b-row>

  <b-card class="enrolments-card">

    <CreateEnrolmentModal ref="CreateEnrolmentModal" />

    <DeleteEnrolmentModal ref="DeleteEnrolmentModal" :enrolmentId="selectedEnrolment" />

    <b-row>
      <b-col class="my-1 right">
        <b-button class="mb-4" @click="showCreateModal()" variant="primary">
          <b-icon class="mr-1 mb-1" icon="plus-circle-fill" font-scale="1.3" style="color: #fff"></b-icon>
          ADD NEW
        </b-button>
      </b-col>
    </b-row>

    <b-table id="enrolments-table" hover :busy="isBusy" :items="enrolments" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">

      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="primary"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">

        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">
          <b-button class="mr-2" variant="primary" size="sm">
            <b-icon icon="arrow-right-square" font-scale="1.3" style="color: #fff"></b-icon>
          </b-button>
        </router-link>

        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}">
          <b-button class="mr-2" variant="warning" size="sm">
            <b-icon icon="pencil-square" font-scale="1.3" style="color: #fff"></b-icon>
          </b-button>
        </router-link>

        <b-button variant="danger" size="sm">
          <b-icon @click="showDeleteModal(data.item.id)" icon="trash" font-scale="1.3" style="color: #fff"></b-icon>
        </b-button>

      </template>
    </b-table>

    <b-row class="mt-4">
      <b-col md="6" class="my-1">
        <b-pagination class="custom-pagination" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="courses-table"></b-pagination>
      </b-col>

      <b-col md="6" class="my-1 ml-auto">
        <div class="d-flex">
          <b-col md="10">
            <p class="mt-2 right">Enrolments / page: </p>
          </b-col>
          <b-form-select :options="pageOptions" v-model="perPage" />
        </div>
      </b-col>
    </b-row>

  </b-card>
</div>
</template>

<script>
import CreateEnrolmentModal from '@/components/CreateEnrolmentModal.vue'
import DeleteEnrolmentModal from '@/components/DeleteEnrolmentModal.vue'
import axios from '@/config/api';

export default {
  name: 'EnrolmentsIndex',
  components: {
    CreateEnrolmentModal,
    DeleteEnrolmentModal,
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
      enrolments: [],
      selectedEnrolment: 0,
      isBusy: false,
    }
  },
  mounted() {
    this.getEnrolments();
  },
  methods: {
    showCreateModal() {
      this.$refs.CreateEnrolmentModal.show();
    },
    showDeleteModal(enrolmentId) {
      this.selectedEnrolment = enrolmentId;
      this.$refs.DeleteEnrolmentModal.show();
    },
    getEnrolments() {
      let token = localStorage.getItem('token');

      this.isBusy = true;

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
        .finally(() => {
          this.isBusy = false;
        });
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
.enrolments-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
</style>
