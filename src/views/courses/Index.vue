<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-26T11:52:27+00:00
-->
<template>
<div class="courses-index">

  <b-row class="mb-2">
    <b-col md="4" class="mb-3">
      <h2>Courses</h2>
    </b-col>
    <b-col md="3 ml-auto">
      <b-breadcrumb>
        <b-breadcrumb-item to="/home">Home</b-breadcrumb-item>
        <b-breadcrumb-item to="/courses">Courses</b-breadcrumb-item>
      </b-breadcrumb>
    </b-col>
  </b-row>

  <b-card class="courses-card">

    <CreateCourseModal ref="CreateCourseModal" />

    <DeleteCourseModal ref="DeleteCourseModal" :courseId="selectedCourse" />

    <b-row class="mb-4">
      <b-col md="6" class="my-1">
        <div class="d-flex">
          <b-form-input type="search" v-model="term" v-on:keyup.enter="searchCourse()" placeholder="Search course by title"></b-form-input>
          <b-button class="float-right ml-2" variant="primary" @click="searchCourse()">Search</b-button>
        </div>
      </b-col>

      <b-col md="6" class="my-1 right">
        <b-button class="mb-4" @click="showCreateModal()" variant="primary">
          <b-icon class="mr-1 mb-1" icon="plus-circle-fill" font-scale="1.3" style="color: #fff"></b-icon>
          ADD NEW
        </b-button>
      </b-col>
    </b-row>

    <b-table id="courses-table" hover :items="filteredCourses" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
      <template #cell(actions)="data">

        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">
          <b-button class="mr-2" variant="primary" size="sm">
            <b-icon icon="arrow-right-square" font-scale="1.3" style="color: #fff"></b-icon>
          </b-button>
        </router-link>

        <b-button class="mr-2" variant="warning" size="sm">
          <router-link :to="{name: 'courses_edit', params: { id: data.item.id }}">
            <b-icon icon="pencil-square" font-scale="1.3" style="color: #fff"></b-icon>
          </router-link>
        </b-button>

        <b-button variant="danger" size="sm">
          <b-icon @click="showDeleteModal(data.item.id)" icon="trash" font-scale="1.3" style="color: #fff"></b-icon>
        </b-button>

      </template>
    </b-table>

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
import CreateCourseModal from '@/components/CreateCourseModal.vue'
import DeleteCourseModal from '@/components/DeleteCourseModal.vue'
import axios from '@/config/api';

export default {
  name: 'CoursesIndex',
  components: {
    CreateCourseModal,
    DeleteCourseModal,
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
      term: "",
      filteredCourses: [],
      selectedCourse: 0,
    }
  },
  watch: {
    term: function() {
      this.searchCourse();
    }
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    showCreateModal() {
      this.$refs.CreateCourseModal.show();
    },
    showDeleteModal(courseId) {
      this.selectedCourse = courseId;
      this.$refs.DeleteCourseModal.show();
    },
    searchCourse() {
      this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(this.term.toLowerCase()));
    },
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.courses = response.data.data;
          this.filteredCourses = this.courses;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
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
  background-color: #B6D9FF;
}

.page-item:hover .page-link {
    background-color: #B6D9FF !important;
    border-color: #B6D9FF !important;
}

.courses-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
</style>
