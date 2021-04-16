<!--
@Date:   2021-02-20T16:42:32+00:00
@Last modified time: 2021-04-13T15:08:59+01:00
-->
<template>
  <b-row class="justify-content-center">
    <b-col md="6 contents">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="form-block">
            <div class="mb-4">
              <h3>Register</h3>
              <p>Please register an account in order to access the college.</p>
            </div>

            <b-form>
              <b-form-group class="name">
                <b-form-input type="text" v-model="form.name" placeholder="Name"></b-form-input>
              </b-form-group>

              <b-form-group class="email">
                <b-form-input type="email" v-model="form.email" placeholder="Email"></b-form-input>
              </b-form-group>

              <b-form-group class="password">
                <b-form-input type="password" v-model="form.password" placeholder="Password"></b-form-input>
              </b-form-group>

              <div class="d-flex mb-5 align-items-center">
                <p>Already a member? <strong><router-link :to="{ name: 'welcome'}">Sign in</router-link></strong></p>
              </div>

              <b-button @click="register()" pill variant="primary">Register</b-button>

            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-col>


  </b-row>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'Register',

  components: {

  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      axios.post('/register', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({
          name: 'home'
        });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>

<style>
.contents {
  width: 50%;
}

.form-block {
  background: #fff;
  padding: 60px;
  box-shadow: 0 2px 3px 0 rgb(0 0 0 / 10%);
}
</style>
