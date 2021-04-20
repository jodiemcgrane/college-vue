<!--
@Date:   2021-02-20T16:42:32+00:00
@Last modified time: 2021-04-20T10:25:48+01:00
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
              <span v-if="!$v.form.name.required && $v.form.name.$dirty" class="text-danger">Name is required!</span>
              <span v-if="!$v.form.name.alpha && $v.form.name.$dirty" class="text-danger">Name must be alphabet characters!</span>
            </b-form-group>

            <b-form-group class="email">
              <b-form-input type="email" v-model="form.email" placeholder="Email"></b-form-input>
              <span v-if="!$v.form.email.required && $v.form.email.$dirty" class="text-danger">Email is required!</span>
              <span v-if="!$v.form.email.email && $v.form.email.$dirty" class="text-danger">Valid Email is required!</span>
            </b-form-group>

            <b-form-group class="password">
              <b-form-input type="password" v-model="form.password" placeholder="Password"></b-form-input>
              <span v-if="!$v.form.password.required && $v.form.password.$dirty" class="text-danger">Password is required!</span>
              <span v-if="(!$v.form.password.minLength || !$v.form.password.maxLength) && $v.form.password.$dirty" class="text-danger">Password must be between {{ $v.form.password.$params.minLength.min}} and
                {{ $v.form.password.$params.maxLength.max}}
                characters!</span>
            </b-form-group>

            <div class="d-flex mb-5 align-items-center">
              <p>Already a member? <strong>
                  <router-link :to="{ name: 'welcome'}">Sign in</router-link>
                </strong></p>
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

import {
  validationMixin
} from "vuelidate";
import {
  required,
  alpha,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
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
  validations: {
    form: {
      name: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      }
    }
  },
  methods: {
    register() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
