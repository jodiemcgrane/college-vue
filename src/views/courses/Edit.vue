<!--
@Date:   2021-03-02T10:01:10+00:00
@Last modified time: 2021-04-10T15:25:51+01:00
-->
<template lang="html">
  <div class="courses-edit">

    <b-row class="justify-content-center">
      <b-col md="12">
      <router-link to="/courses">
        <div v-b-hover="handleHover">
          <div class="d-flex">
            <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #383f45"></b-icon>
            <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #212529"></b-icon>
            <span>
              <div  class="heavy" style="color: #212529">
                Back to Courses
              </div>
            </span>
          </div>
        </div>
      </router-link>
    </b-col>
    </b-row>

<b-row class="mt-5 justify-content-center">
    <b-col md="10">

      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
    <b-card class="edit-courses-card">
      <b-row class="mb-4">
        <b-col md="8" class="my-1">
            <h3>Edit Course: {{ form.title }}</h3>
            <div class="border-bottom-black"></div>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form>
            <div class="wrap-input">
              <b-form-group label="Title">
                <b-form-input type="text" v-model="form.title">
              </b-form-input>
              </b-form-group>
            </div>

            <b-form-group label="Code">
              <b-form-input type="text" v-model="form.code" />
            </b-form-group>

            <b-form-group label="Points">
              <b-form-input type="text" v-model="form.points" />
            </b-form-group>

            <b-form-group label="Level">
              <b-form-input type="text" v-model="form.level" />
            </b-form-group>
          </b-form>
        </b-col>

        <b-col md="6">
          <b-row>
            <b-col md="8">
              <b-form-group label="Description">
                <b-form-textarea class="description-box" type="text" rows="5" placeholder="Enter course description..." v-model="form.description" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="justify-content-center mt-3">
        <b-button @click="updateCourse()" class="update-pill-button heavy" pill variant="warning">UPDATE</b-button>
      </b-row>

    </b-card>
    </b-overlay>

  </b-col>
</b-row>
  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CoursesEdit',
  components: {

  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      isHovered: false,
      show: false,
      errors: {}
    }
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    getCourse() {
      let token = localStorage.getItem('token');

      this.show = true;

      axios.get(`/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.form.title = response.data.data.title;
          this.form.code = response.data.data.code;
          this.form.description = response.data.data.description;
          this.form.points = response.data.data.points;
          this.form.level = response.data.data.level;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
        .finally(() => {
          this.show = false;
        });
    },
    updateCourse() {
      let token = localStorage.getItem('token');

      axios.put(`/courses/${this.$route.params.id}`, {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>

<style>
.btn-warning,
.btn-warning:hover {
  color: #fff;
}

.edit-courses-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.border-bottom-black {
  width: 820px;
  position: relative;
  border-bottom: 1px solid #282828;
}

.update-pill-button {
  height: 50px;
  width: 15%;
}

.heavy {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
