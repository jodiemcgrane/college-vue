<!--
@Date:   2021-03-27T11:48:41+00:00
@Last modified time: 2021-04-21T00:09:06+01:00
-->
<template>
<div>
  <b-modal id="updateCourseModal" ref="updateCourseModal" centered title="Update Course" size="lg" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="6">
        <b-form>

          <b-form-group label="Title">
            <b-form-input type="text" v-model="updateCourseData.title" />
          </b-form-group>

          <b-form-group label="Code">
            <b-form-input type="text" v-model="updateCourseData.code" />
          </b-form-group>

          <b-form-group label="Points">
            <b-form-input type="text" v-model="updateCourseData.points" />
          </b-form-group>

          <b-form-group label="Level">
            <b-form-input type="text" v-model="updateCourseData.level" />
          </b-form-group>
        </b-form>
      </b-col>

      <b-col md="6">
        <b-row>
          <b-col md="8">
            <b-form-group label="Description">
              <b-form-textarea class="description-box" type="text" rows="5" placeholder="Enter course description..." v-model="updateCourseData.description" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="updateCourse(); hide();" pill variant="warning" text-variant="white">Update</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'UpdateCourseModal',
  props: {
    updateCourseData: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.$refs.updateCourseModal.show();
    },
    hide() {
      this.$refs.updateCourseModal.hide();
    },
    updateCourse() {
      let token = localStorage.getItem('token');

      axios.put(`/courses/${this.updateCourseData.id}`, {
          title: this.updateCourseData.title,
          code: this.updateCourseData.code,
          description: this.updateCourseData.description,
          points: this.updateCourseData.points,
          level: this.updateCourseData.points
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          // this.$router.push({
          //   name: 'courses_index'
          // });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>

<style>
.submit-button {
  width: 15%;
}
</style>
