<!--
@Date:   2021-03-02T10:01:10+00:00
@Last modified time: 2021-03-19T13:42:15+00:00
-->
<template lang="html">
  <div>
    <b-row>
      <b-col md="6">
        <b-form>
          <div class="wrap-input">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="form.title" />
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

    <b-row>
      <b-button @click="createCourse()" pill variant="warning">Update</b-button>
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
      errors: {}
    }
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      let token = localStorage.getItem('token');

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
    },
    createCourse() {
      let token = localStorage.getItem('token');

      axios.put(`/courses/${this.$route.params.id}`, {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.points
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

<style lang="css" scoped>
</style>
