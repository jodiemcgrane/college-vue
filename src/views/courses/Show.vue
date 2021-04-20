<!--
@Date:   2021-02-17T15:50:57+00:00
@Last modified time: 2021-04-20T23:19:40+01:00
-->
<template>
<div class="courses-show">

  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="10">
      <b-card class="courses-show-card-blue" bg-variant="primary" text-variant="white">

        <div>
          <b-card-text>
            <h2>{{ course.title }}</h2>
            <hr style="background-color: #fff; text-align: left; margin-left: 0">

            <div class="d-flex mt-5 mb-4 align-items-center">
              <h5>Level: {{ course.level }}</h5>
              <span class="ml-auto">
                <h5>Points: {{ course.points }}</h5>
              </span>
            </div>
          </b-card-text>

          <b-card-text>
            <div class="mr-5">
              <p>{{ course.description }}</p>
            </div>

            <div class="my-4">
              <h5>Code: {{ course.code }}</h5>
            </div>

            <template>
              <div>
                <b-row>
                  <b-col md="6" class="my-1">
                    <div class="white-link d-flex">
                      <router-link to="/courses" style="color: #fff; text-decoration: none">
                        <div v-b-hover="handleHover">
                          <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #fff"></b-icon>
                          <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #fff"></b-icon>
                          Back to Courses
                        </div>
                      </router-link>
                    </div>
                  </b-col>

                  <b-col class="right">
                    <b-button @click="showUpdateModal()" class="mr-2" variant="primary" size="sm">
                      <b-icon icon="pencil-square" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>

                    <b-button @click="showDeleteCourseModal(course.id)" variant="primary" size="sm">
                      <b-icon icon="trash" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </template>

          </b-card-text>
        </div>
      </b-card>
    </b-col>
  </b-row>

  <UpdateCourseModal ref="UpdateCourseModal" :updateCourseData="course" />

  <DeleteCourseModal ref="DeleteCourseModal" :courseId="selectedCourse" :deleteCourseData="course" />

  <b-row class="justify-content-center">
    <b-col md="10">
      <b-card class="courses-show-card mt-5">

        <CreateEnrolmentModal v-on:get-enrolments="getEnrolments" ref="CreateEnrolmentModal" />

        <b-row>
          <b-col md="6" class="my-1">
            <div class="d-flex">
              <h5>Enrolments for: {{ course.title }}</h5>
            </div>
          </b-col>

          <b-col class="my-1 right">
            <b-button class="mb-4" @click="showCreateModal()" variant="primary">
              <b-icon class="mr-1 mb-1" icon="plus-circle-fill" font-scale="1.3" style="color: #fff"></b-icon>
              ADD NEW
            </b-button>
          </b-col>
        </b-row>

        <b-table id="course-enrolments-table" class="mt-3" hover :busy="isBusy" :items="enrolments" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive="sm">

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
              <b-icon @click="showDeleteEnrolmentModal(data.item.id)" icon="trash" font-scale="1.3" style="color: #fff"></b-icon>
            </b-button>

          </template>
        </b-table>

        <DeleteEnrolmentModal ref="DeleteEnrolmentModal" :enrolmentId="selectedEnrolment" />

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
    </b-col>
  </b-row>

</div>
</template>

<script>
import UpdateCourseModal from '@/components/UpdateCourseModal.vue'
import DeleteCourseModal from '@/components/DeleteCourseModal.vue'
import CreateEnrolmentModal from '@/components/CreateEnrolmentModal.vue'
import DeleteEnrolmentModal from '@/components/DeleteEnrolmentModal.vue'

import axios from '@/config/api';

export default {
  name: 'CoursesShow',
  components: {
    UpdateCourseModal,
    DeleteCourseModal,
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
        'lecturer_id',
        'Actions'
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      course: {},
      enrolments: [],
      selectedCourse: 0,
      selectedEnrolment: 0,
      isHovered: false,
      isBusy: false,
    }
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    showUpdateModal() {
      this.$refs.UpdateCourseModal.show();
    },
    showDeleteCourseModal(courseId) {
      this.selectedCourse = courseId;
      this.$refs.DeleteCourseModal.show();
    },
    showCreateModal() {
      this.$refs.CreateEnrolmentModal.show();
    },
    showDeleteEnrolmentModal(enrolmentId) {
      this.selectedEnrolment = enrolmentId;
      this.$refs.DeleteEnrolmentModal.show();
    },
    getCourse() {
      let token = localStorage.getItem('token');

      this.isBusy = true;

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
.courses-show-card-blue {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.courses-show-card-blue:hover {
  transform: scale(1.10);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}

.courses-show-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.white-link {

}

/* a.router-link-active, a.router-link-active:hover {
  color: #fff;
  text-decoration: none;
} */
</style>
