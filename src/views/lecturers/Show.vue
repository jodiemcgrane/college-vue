<!--
@Date:   2021-03-08T12:13:24+00:00
@Last modified time: 2021-04-20T22:57:01+01:00
-->
<template>
<div class="lecturers-show">
  <b-row class="justify-content-center">
    <b-col class="mt-3 mb-3" md="8">
      <b-card class="lecturers-show-card-blue" bg-variant="primary" text-variant="white">

        <div>
          <b-card-text>
            <h2>{{ lecturer.name }}</h2>
            <hr style="background-color: #fff; text-align: left; margin-left: 0">

            <b-card-text>
              <div class="mt-4">
                <h5>ID: {{ lecturer.id }}</h5>
              </div>

              <div class="my-4">
                <h5>Code: {{ lecturer.address }}</h5>
              </div>
            </b-card-text>

            <div class="d-flex mt-4 mb-4 align-items-center">
              <h5>E-mail: {{ lecturer.email }}</h5>
              <span class="ml-auto">
                <h5>Phone No: {{ lecturer.phone }}</h5>
              </span>
            </div>

            <template>
              <div>
                <b-row>
                  <b-col md="6">
                    <div class="d-flex">
                      <router-link to="/lecturers" style="color: #fff; text-decoration: none">
                        <div v-b-hover="handleHover">
                          <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #fff"></b-icon>
                          <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #fff"></b-icon>
                          Back to Lecturers
                        </div>
                      </router-link>
                    </div>
                  </b-col>

                  <b-col class="right">
                    <b-button @click="showUpdateLecturerModal()" class="mr-2" variant="primary" size="sm">
                      <b-icon icon="pencil-square" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>

                    <b-button @click="showDeleteLecturerModal(lecturer.id)" variant="primary" size="sm">
                      <b-icon icon="trash" font-scale="1.6" style="color: #fff"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </template>

            <DeleteLecturerModal ref="DeleteLecturerModal" :lecturerId="selectedLecturer" />

          </b-card-text>
        </div>

      </b-card>
    </b-col>
  </b-row>

  <UpdateLecturerModal ref="UpdateLecturerModal" :updateLecturerData="lecturer" />

  <DeleteLecturerModal ref="DeleteLecturerModal" :lecturerId="selectedLecturer" />


  <b-row class="justify-content-center">
    <b-col md="10">
      <b-card class="lecturers-show-card mt-5">

        <CreateEnrolmentModal v-on:get-enrolments="getEnrolments" ref="CreateEnrolmentModal" />

        <b-row>
          <b-col md="6" class="my-1">
            <div class="d-flex">
              <h5>Enrolments for: {{ lecturer.name }}</h5>
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

            <router-link :to="{name: 'enrolments_edit', params: { id: data.item.id }}">
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
import UpdateLecturerModal from '@/components/UpdateLecturerModal.vue'
import DeleteLecturerModal from '@/components/DeleteLecturerModal.vue'
import CreateEnrolmentModal from '@/components/CreateEnrolmentModal.vue'
import DeleteEnrolmentModal from '@/components/DeleteEnrolmentModal.vue'

import axios from '@/config/api';

export default {
  name: 'LecturersShow',
  components: {
    UpdateLecturerModal,
    DeleteLecturerModal,
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
        'Actions'
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      lecturer: {},
      enrolments: [],
      selectedLecturer: 0,
      selectedEnrolment: 0,
      isBusy: false,
      isHovered: false,
    }
  },
  mounted() {
    this.getLecturer();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    showUpdateLecturerModal() {
      this.$refs.UpdateLecturerModal.show();
    },
    showDeleteLecturerModal(lecturerId) {
      this.selectedLecturer = lecturerId;
      this.$refs.DeleteLecturerModal.show();
    },
    showCreateModal() {
      this.$refs.CreateEnrolmentModal.show();
    },
    showDeleteEnrolmentModal(enrolmentId) {
      this.selectedEnrolment = enrolmentId;
      this.$refs.DeleteEnrolmentModal.show();
    },
    getLecturer() {
      let token = localStorage.getItem('token');

      this.isBusy = true;

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
.lecturers-show-card-blue {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.lecturers-show-card-blue:hover {
  transform: scale(1.10);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}

.lecturers-show-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
</style>
