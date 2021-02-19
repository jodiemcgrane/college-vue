<!--
@Date:   2021-02-19T14:03:38+00:00
@Last modified time: 2021-02-19T16:30:28+00:00
-->
<template>
<b-row class="justify-content-center">
  <b-col md="6 contents">
    <b-row class="justify-content-center">
      <b-col md="12">

        <div class="form-block">
        <div class="mb-4">
          <h3>Sign-in to access College</h3>
          <p class="mb-4">Please enter the correct credentials to sign-in to the college system.</p>

          <b-form>
            <b-form-group class="first" label="Email Address:">
              <b-form-input type="email" v-model="form.email" placeholder="Enter your email address" required></b-form-input>
            </b-form-group>

            <b-form-group class="last mb-4" label="Password:">
              <b-form-input type="password" v-model="form.password" placeholder="Enter your password" required></b-form-input>
            </b-form-group>

            <div class="d-flex mb-5 align-items-center">
              <span>Not registered?</span>
              <span class="ml-auto">
                <a href="#">Register</a>
              </span>
            </div>

              <b-button @click="login()" type="submit" pill variant="primary">Login</b-button>

          </b-form>
        </div>
      </div>
      </b-col>
    </b-row>
  </b-col>
</b-row>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  components: {

  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },

    };
  },
  methods: {
    login() {
      axios.post('http://college.api:8000/api/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          this.$router.replace({
            name: 'courses_index'
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
  box-shadow: 0 2px 3px 0 rgb(130 59 59 / 10%);
}

.form-group {
  position: relative;
}

.form-group.first {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

.form-group.last {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.rounded-pill {
  height: 54px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 30px;
  width: 100%;
}
</style>
