<!--
@Date:   2021-03-06T13:26:11+00:00
@Last modified time: 2021-04-20T10:32:24+01:00
-->
<template>
<div class="enrolments-show">

  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="6">
      <b-card class="enrolments-show-card-blue" bg-variant="primary" text-variant="white">

        <div>
          <b-card-text>
            <b-card-text>
              <h2>Enrolment ID: {{ enrolment.id }}</h2>
              <div class="border-bottom"></div>
            </b-card-text>

            <b-card-text>

              <b-row class="mt-4">
                <b-col class="ml-4">
                  <h5>Date: {{ enrolment.date }}</h5>
                </b-col>
                <b-col class="ml-4">
                  <h5>Time: {{ enrolment.time }}</h5>
                </b-col>
              </b-row>


              <b-row class="my-4">
                <b-col class="ml-4">
                  <h5>Status: {{ enrolment.status }}</h5>
                </b-col>
              </b-row>

              <b-row class="my-4">
                <b-col class="ml-4">
                  <h5>Lecturer ID: {{ enrolment.lecturer.id }}</h5>
                </b-col>
                <b-col class="ml-4">
                  <h5>Course ID: {{ enrolment.course.id }}</h5>
                </b-col>
              </b-row>

            </b-card-text>

            <template>
              <div>
                <b-row>
                  <b-col md="6">
                    <div class="d-flex">
                      <router-link to="/enrolments">
                        <div v-b-hover="handleHover">
                          <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #fff"></b-icon>
                          <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #fff"></b-icon>
                          Back to Enrolments
                        </div>
                      </router-link>
                    </div>
                  </b-col>

                  <b-col class="right">
                    <b-button @click="showUpdateEnrolmentModal()" class="mr-2" variant="primary" size="sm">
                      <b-icon icon="pencil-square" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>

                    <b-button @click="showDeleteEnrolmentModal(enrolment.id)" variant="primary" size="sm">
                      <b-icon icon="trash" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </template>

            <DeleteEnrolmentModal ref="DeleteEnrolmentModal" :enrolmentId="selectedEnrolment" />

          </b-card-text>
        </div>
      </b-card>
    </b-col>
  </b-row>

  <UpdateEnrolmentModal ref="UpdateEnrolmentModal" :updateEnrolmentData="enrolment" />

  <b-row class="justify-content-center">
    <b-col class="mt-3" sm="5">

      <b-card class="enrolments-show-card">
        <b-row>
          <h3>{{ enrolment.course.title }}</h3>
          <b-col class="right">
            <p class="mt-2">ID: {{ enrolment.course.id }}</p>
          </b-col>
          <div class="border-bottom-black"></div>
        </b-row>

        <b-card-text>
          <b-row class="mt-4">
            <h5>Code: {{ enrolment.course.code }}</h5>
          </b-row>
          <b-row class="my-3">
            <h5>Points: {{ enrolment.course.points }}</h5>
          </b-row>
          <b-row class="mb-3">
            <h5>Level: {{ enrolment.course.level }}</h5>
          </b-row>

          <template>
            <div>
              <b-row>
                <b-col class="my-1">
                  <div class="d-flex">
                    <b-button to="/courses" pill variant="primary" btn-sm>View All</b-button>
                  </div>
                </b-col>

                <b-col class="right mt-1">
                  <b-button @click="showUpdateCourseModal()" class="mr-2" variant="warning" size="sm">
                    <b-icon icon="pencil-square" font-scale="1.6" style="color: #fff"></b-icon>
                  </b-button>

                  <b-button @click="showDeleteCourseModal(enrolment.course.id)" variant="danger" size="sm">
                    <b-icon icon="trash" font-scale="1.6" style="color: #fff"></b-icon>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </template>

          <UpdateCourseModal ref="UpdateCourseModal" :updateCourseData="course" />

          <DeleteCourseModal ref="DeleteCourseModal" :courseId="selectedCourse" />

        </b-card-text>
      </b-card>
    </b-col>

    <b-col class="mt-3" sm="5">
      <b-card class="enrolments-show-card">

        <b-row>
          <h3>{{ enrolment.lecturer.name }}</h3>
          <b-col class="right">
            <p class="mt-2">ID: {{ enrolment.lecturer.id }}</p>
          </b-col>
          <div class="border-bottom-black"></div>
        </b-row>

        <b-card-text>
          <b-row class="mt-4">
            <h5>E-mail: {{ enrolment.lecturer.email }}</h5>
          </b-row>
          <b-row class="my-3">
            <h5>Phone No: {{ enrolment.lecturer.phone }}</h5>
          </b-row>
          <b-row class="mb-5">

          </b-row>

          <template>
            <div>
              <b-row>
                <b-col class="my-1">
                  <div class="d-flex">
                    <b-button to="/lecturers" pill variant="primary" btn-sm>View All</b-button>
                  </div>
                </b-col>

                <b-col class="right mt-1">
                  <b-button @click="showUpdateLecturerModal()" class="mr-2" variant="warning" size="sm">
                    <b-icon icon="pencil-square" font-scale="1.5" style="color: #fff"></b-icon>
                  </b-button>

                  <b-button @click="showDeleteLecturerModal(enrolment.lecturer.id)" variant="danger" size="sm">
                    <b-icon icon="trash" font-scale="1.5" style="color: #fff"></b-icon>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </template>

          <UpdateLecturerModal ref="UpdateLecturerModal" :updateLecturerData="lecturer" />

          <DeleteLecturerModal ref="DeleteLecturerModal" :lecturerId="selectedLecturer" />

        </b-card-text>
      </b-card>
    </b-col>
  </b-row>

</div>
</template>

<script>
import UpdateEnrolmentModal from '@/components/UpdateEnrolmentModal.vue'
import DeleteEnrolmentModal from '@/components/DeleteEnrolmentModal.vue'

import UpdateCourseModal from '@/components/UpdateCourseModal.vue'
import DeleteCourseModal from '@/components/DeleteCourseModal.vue'

import UpdateLecturerModal from '@/components/UpdateLecturerModal.vue'
import DeleteLecturerModal from '@/components/DeleteLecturerModal.vue'

import axios from '@/config/api';

export default {
  name: 'EnrolmentsShow',
  components: {
    UpdateEnrolmentModal,
    DeleteEnrolmentModal,
    UpdateCourseModal,
    DeleteCourseModal,
    UpdateLecturerModal,
    DeleteLecturerModal,
  },
  data() {
    return {
      enrolment: {},
      isHovered: false,
      selectedEnrolment: 0,
      course: {},
      lecturer: {},
      selectedCourse: 0,
      selectedLecturer: 0,
    }
  },
  mounted() {
    this.getEnrolment();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    showUpdateEnrolmentModal() {
      this.$refs.UpdateEnrolmentModal.show();
    },
    showDeleteEnrolmentModal(enrolmentId) {
      this.selectedEnrolment = enrolmentId;
      this.$refs.DeleteEnrolmentModal.show();
    },
    showUpdateCourseModal() {
      this.$refs.UpdateCourseModal.show();
    },
    showDeleteCourseModal(courseId) {
      this.selectedCourse = courseId;
      this.$refs.DeleteCourseModal.show();
    },
    showUpdateLecturerModal() {
      this.$refs.UpdateLecturerModal.show();
    },
    showDeleteLecturerModal(lecturerId) {
      this.selectedLecturer = lecturerId;
      this.$refs.DeleteLecturerModal.show();
    },
    getEnrolment() {
      let token = localStorage.getItem('token');

      axios.get(`/enrolments/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.enrolment = response.data.data;
          this.course = response.data.data.course;
          this.lecturer = response.data.data.lecturer;

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
.enrolments-show-card-blue {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.enrolments-show-card-blue:hover {
  transform: scale(1.10);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}

/* .border-bottom {
  width: 420px;
  position: relative;
  border-bottom: 1px solid #fff;
} */

.border-bottom-black {
  width: 280px;
  position: relative;
  border-bottom: 1px solid #282828;
}

.card {
  height: 100%;
}

.enrolments-show-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
</style>
