<!--
@Date:   2021-03-20T14:42:29+00:00
@Last modified time: 2021-03-20T14:56:50+00:00
-->
<template lang="html">
  <div>
    <b-row>
      <b-col md="6">
        <b-form>
          <div class="wrap-input">
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
      </b-col>
    </b-row>

    <b-row>
      <b-button @click="updateLecturer()" pill variant="warning">Update</b-button>
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
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {}
    }
  },
  mounted() {
    this.getLecturer();
  },
  methods: {
    getLecturer() {
      let token = localStorage.getItem('token');

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
    },
    updateLecturer() {
      let token = localStorage.getItem('token');

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
    }
  },
}
</script>

<style lang="css" scoped>
</style>
