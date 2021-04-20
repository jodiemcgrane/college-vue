<!--
@Date:   2021-03-13T17:29:27+00:00
@Last modified time: 2021-04-20T22:35:53+01:00
-->
<template>
<div>
  <b-modal id="createCourseModal" ref="createCourseModal" centered title="Add a Course" size="lg" header-bg-variant="primary" header-text-variant="light" v-bind:hide-footer="true">

    <b-row>
      <b-col md="6">
        <b-form @submit.prevent="createCourse()">

          <b-form-group label="Title">
            <b-form-input type="text" v-model="form.title" />
            <span v-if="!$v.form.title.required && $v.form.title.$dirty" class="text-danger">Title is required!</span>
            <span v-if="!$v.form.title.maxLength && $v.form.title.$dirty" class="text-danger">Title must be max {{ $v.form.title.$params.maxLength.max}} characters!
              characters!</span>
          </b-form-group>

          <b-form-group label="Code">
            <b-form-input type="text" v-model="form.code" />
            <span v-if="!$v.form.code.required && $v.form.code.$dirty" class="text-danger">Code is required!</span>
            <span v-if="!$v.form.code.maxLength && $v.form.code.$dirty" class="text-danger">Code must be max {{ $v.form.code.$params.maxLength.max}} characters!</span>
          </b-form-group>

          <b-form-group label="Points">
            <b-form-input type="text" v-model="form.points" />
            <span v-if="!$v.form.points.required && $v.form.points.$dirty" class="text-danger">Points is required!</span>
            <span v-if="!$v.form.points.integer && $v.form.points.$dirty" class="text-danger">Points must be an integer!</span>
            <br />
            <span v-if="(!$v.form.points.minValue || !$v.form.points.maxValue) && $v.form.points.$dirty" class="text-danger">Points must be between {{ $v.form.points.$params.minValue.min}} and {{ $v.form.points.$params.maxValue.max}}!</span>
          </b-form-group>

          <b-form-group label="Level">
            <b-form-input type="text" v-model="form.level" />
            <span v-if="!$v.form.level.required && $v.form.level.$dirty" class="text-danger">Level is required!</span>
            <span v-if="!$v.form.level.integer && $v.form.level.$dirty" class="text-danger">Level must be an integer!</span>
            <br />
            <span v-if="(!$v.form.level.minValue || !$v.form.level.maxValue) && $v.form.level.$dirty" class="text-danger">Level must be between {{ $v.form.level.$params.minValue.min}} and {{ $v.form.level.$params.maxValue.max}}!</span>
          </b-form-group>
        </b-form>
      </b-col>

      <b-col md="6">
        <b-row>
          <b-col md="8">
            <b-form-group label="Description">
              <b-form-textarea class="description-box" type="text" rows="5" placeholder="Enter course description..." v-model="form.description" />
              <span v-if="!$v.form.description.required && $v.form.description.$dirty" class="text-danger">Description is required!</span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

    </b-row>

    <template>
      <div class="text-center">
        <b-button class="submit-button mt-1 mb-1" @click="createCourse();" pill variant="primary">Submit</b-button>
      </div>
    </template>

  </b-modal>
</div>
</template>

<script>
import axios from '@/config/api';
import {
  validationMixin
} from "vuelidate";
import {
  required,
  maxLength,
  maxValue,
  minValue,
  integer,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
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
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(50),
      },
      code: {
        required,
        maxLength: maxLength(5),
      },
      description: {
        required,
      },
      points: {
        required,
        minValue: minValue(100),
        maxValue: maxValue(600),
        integer,
      },
      level: {
        required,
        minValue: minValue(7),
        maxValue: maxValue(10),
        integer,
      },
    }
  },
  methods: {
    show() {
      this.$refs.createCourseModal.show();
    },
    hide() {
      this.$refs.createCourseModal.hide();
    },
    getCourses() {
      this.$emit("get-courses");
    },
    createCourse() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
            this.$refs.createCourseModal.hide();
            this.$emit("get-courses");
          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
          })
      }
    },
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
