<!--
@Date:   2021-03-20T14:42:29+00:00
@Last modified time: 2021-04-20T14:49:22+01:00
-->
<template lang="html">
  <div class="lecturers-edit">

    <b-row class="justify-content-center">
      <b-col md="4">
      <router-link to="/lecturers" style="color: #212529; text-decoration: none">
        <div v-b-hover="handleHover">
          <div class="d-flex">
            <b-icon v-if="isHovered" class="mr-2" icon="arrow-left-circle-fill" font-scale="1.6" style="color: #383f45"></b-icon>
            <b-icon v-else class="mr-2" icon="arrow-left-circle" font-scale="1.6" style="color: #212529"></b-icon>
            <span>
              <div  class="heavy" style="color: #212529">
                Back to Lecturers
              </div>
            </span>
          </div>
        </div>
      </router-link>
    </b-col>

    <b-col md="3 ml-auto">
      <b-breadcrumb>
        <b-breadcrumb-item to="/home" class="ml-2">Home</b-breadcrumb-item>
        <b-breadcrumb-item to="/lecturers">Lecturers</b-breadcrumb-item>
        <b-breadcrumb-item :to = "{ name: 'lecturers_edit', params: {lecturer_id: this.$route.params.id}} ">Edit</b-breadcrumb-item>
      </b-breadcrumb>
    </b-col>
    </b-row>

    <b-row class="mt-5 justify-content-center">
      <b-col md="7">

        <b-overlay :show="show" rounded="sm" spinner-variant="primary">
          <b-card class="edit-lecturers-card">

            <b-row class="mb-4">
              <b-col md="12" class="my-1">
                  <h3>Edit Lecturer: {{ form.name }}</h3>
                  <hr style="background-color: #212529; text-align: left; margin-left: 0">
              </b-col>
            </b-row>

        <b-form>
          <div>
            <b-form-group label="Name">
              <b-form-input type="text" v-model="form.name" />
            </b-form-group>
          </div>

          <b-form-group label="Address">
            <b-form-input type="text" v-model="form.address" />
          </b-form-group>

          <b-form-group label="E-mail">
            <b-form-input type="text" v-model="form.email" />
          </b-form-group>

          <b-form-group label="Phone">
            <b-form-input type="text" v-model="form.phone" />
          </b-form-group>
        </b-form>

        <b-row class="justify-content-center mt-4">
          <b-button @click="updateLecturer()" class="update-pill-button heavy" pill variant="warning">Update</b-button>
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
  name: 'LecturersEdit',
  components: {

  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      isHovered: false,
      show: false,
      errors: {}
    }
  },
  mounted() {
    this.getLecturer();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    getLecturer() {
      let token = localStorage.getItem('token');

      this.show = true;

      axios.get(`/lecturers/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.form.name = response.data.data.name;
          this.form.address = response.data.data.address;
          this.form.email = response.data.data.email;
          this.form.phone = response.data.data.phone;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
        .finally(() => {
          this.show = false;
        });
    },
    updateLecturer() {
      let token = localStorage.getItem('token');

      this.show = true;

      axios.put(`/lecturers/${this.$route.params.id}`, {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          phone: this.form.phone,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'lecturers_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
        .finally(() => {
          this.show = false;
        });
    }
  },
}
</script>

<style>
.edit-lecturers-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}

.update-pill-button {
  height: 50px;
  width: 25%;
}

.heavy {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
