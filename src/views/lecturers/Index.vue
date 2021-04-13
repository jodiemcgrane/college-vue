<!--
@Date:   2021-03-08T12:13:19+00:00
@Last modified time: 2021-04-13T14:59:59+01:00
-->
<template>
<div class="lecturers-index">

  <b-row class="mb-2">
    <b-col md="4" class="mb-3">
      <h2>Lecturers</h2>
    </b-col>
    <!-- <b-col md="3 ml-auto">
      <b-breadcrumb>
        <b-breadcrumb-item to="/home">Home</b-breadcrumb-item>
        <b-breadcrumb-item to="/lecturers">Lecturers</b-breadcrumb-item>
      </b-breadcrumb>
    </b-col> -->
  </b-row>

  <b-card class="lecturers-card">

    <CreateLecturerModal ref="CreateLecturerModal" />

    <DeleteLecturerModal ref="DeleteLecturerModal" :lecturerId="selectedLecturer" />

    <b-row class="mb-4">
      <b-col md="6" class="my-1">
        <div class="d-flex">
          <b-form-input type="search" v-model="term" @input="searchLecturer()" v-on:keyup.enter="searchLecturer()" placeholder="Search lecturer by name"></b-form-input>
          <b-button class="float-right ml-2" variant="primary" @click="searchLecturer()">Search</b-button>
        </div>
      </b-col>

      <b-col md="6" class="my-1 right">
        <b-button class="mb-4" @click="showCreateModal()" variant="primary">
          <b-icon class="mr-1 mb-1" icon="plus-circle-fill" font-scale="1.3" style="color: #fff"></b-icon>
          ADD NEW
        </b-button>
      </b-col>
    </b-row>


    <b-row>
      <b-table id="lecturers-table" hover :busy="isBusy" responsive :items="filteredLecturers" :fields="fields" :per-page="perPage" :current-page="currentPage">

        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="primary"></b-spinner>
          </div>
        </template>

        <template #cell(actions)="data">

          <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">
            <b-button class="mr-2" variant="primary" size="sm">
              <b-icon icon="arrow-right-square" font-scale="1.3" style="color: #fff"></b-icon>
            </b-button>
          </router-link>

          <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}">
            <b-button class="mr-2" variant="warning" size="sm">
              <b-icon icon="pencil-square" font-scale="1.3" style="color: #fff"></b-icon>
            </b-button>
          </router-link>

          <b-button variant="danger" size="sm">
            <b-icon @click="showDeleteModal(data.item.id)" icon="trash" font-scale="1.3" style="color: #fff"></b-icon>
          </b-button>

        </template>

      </b-table>
    </b-row>


    <b-row class="mt-4">
      <b-col md="6" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="courses-table"></b-pagination>
      </b-col>

      <b-col md="6" class="my-1 ml-auto">
        <div class="d-flex">
          <b-col md="10">
            <p class="mt-2 right">Courses / page: </p>
          </b-col>
          <b-form-select :options="pageOptions" v-model="perPage" />
        </div>
      </b-col>
    </b-row>

  </b-card>
</div>
</template>

<script>
import CreateLecturerModal from '@/components/CreateLecturerModal.vue'
import DeleteLecturerModal from '@/components/DeleteLecturerModal.vue'
import axios from '@/config/api';

export default {
  name: 'LecturersIndex',
  components: {
    CreateLecturerModal,
    DeleteLecturerModal,
  },
  data() {
    return {
      fields: [
        'id',
        'name',
        'address',
        'email',
        'phone',
        'actions',
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [10, 20, 30],
      lecturers: [],
      term: "",
      filteredLecturers: [],
      selectedLecturer: 0,
      isBusy: false,
    }
  },
  watch: {
    term: function() {
      this.searchLecturer();
    }
  },
  mounted() {
    this.getLecturers();
  },
  methods: {
    showCreateModal() {
      this.$refs.CreateLecturerModal.show();
    },
    showDeleteModal(lecturerId) {
      this.selectedLecturer = lecturerId;
      this.$refs.DeleteLecturerModal.show();
    },
    searchLecturer() {
      this.filteredLecturers = this.lecturers.filter(lecturer => lecturer.name.toLowerCase().includes(this.term.toLowerCase()));
    },
    getLecturers() {
      let token = localStorage.getItem('token');

      this.isBusy = true;

      axios.get('/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturers = response.data.data;
          this.filteredLecturers = this.lecturers;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
        .finally(() => {
          this.isBusy = false;
        });
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
.lecturers-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

</style>
