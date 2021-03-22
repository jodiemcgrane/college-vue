<!--
@Date:   2021-03-13T17:29:27+00:00
@Last modified time: 2021-03-22T12:47:48+00:00
-->
<template>
<div>
  <b-modal id="createCourseModal" ref="createCourseModal" centered title="Add a Course" size="lg" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="6">
        <b-form>

          <b-form-group label="Title">
            <b-form-input type="text" v-model="form.title" />
          </b-form-group>


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

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createCourse(); hideModal();" pill variant="primary">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CreateCourseModal',
  components: {

  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
      }
    }
  },
  methods: {
    show() {
      this.$refs.createCourseModal.show();
    },
    hideModal() {
      this.$refs.createCourseModal.hide()
    },
    hide() {
      this.$refs.createCourseModal.hide();
    },
    createCourse() {
      let token = localStorage.getItem('token');
      axios.post('/courses', {
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
.submit-button {
  width: 15%;
}

.description-box {
  height: 100%;
  width: 360px;
}

.modal-backdrop {
  display: none;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

legend {
  font-weight: 500;
}
</style>
