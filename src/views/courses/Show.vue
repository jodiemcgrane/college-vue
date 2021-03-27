<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-03-27T12:16:58+00:00
-->
<template>
<div class="courses-show">
  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="10">
      <b-card class="courses-show-card">
        <div>
          <b-card-text>
            <h2>{{ course.title }}</h2>

            <div class="d-flex mt-3 mb-5 align-items-center">
              <h5>Level: {{ course.level }}</h5>
              <span class="ml-auto">
                <h5>Points: {{ course.points }}</h5>
              </span>
            </div>

            <p>{{ course.description }}</p>

            <p>Code: {{ course.code }}</p>

            <b-button @click="showUpdateModal()" pill variant="warning">Update</b-button>
          </b-card-text>
        </div>
      </b-card>
    </b-col>
  </b-row>

  <UpdateCourseModal ref="UpdateCourseModal" :updateCourseData="course" />

  <b-row class="justify-content-center">
    <b-col md="10">

      <h5>Enrolments for: {{ course.title }}</h5>

      <b-table id="course-enrolments-table" class="mt-3" hover :items="enrolments" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">
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

    </b-col>
  </b-row>

</div>
</template>

<script>
import UpdateCourseModal from '@/components/UpdateCourseModal.vue'
import axios from '@/config/api';

export default {
  name: 'CoursesShow',
  components: {
    UpdateCourseModal,
  },
  data() {
    return {
      fields: [
        'id',
        'date',
        'time',
        'status',
        'lecturer_id',
        'Actions'
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      course: {},
      enrolments: [],
    }
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    showUpdateModal() {
      this.$refs.UpdateCourseModal.show();
    },
    getCourse() {
      let token = localStorage.getItem('token');

      axios.get(`/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.course = response.data.data;
          this.enrolments = response.data.data.enrolments
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>
.courses-show-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
</style>
