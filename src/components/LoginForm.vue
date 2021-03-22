<!--
@Date:   2021-02-19T14:03:38+00:00
@Last modified time: 2021-03-22T12:19:39+00:00
-->
<template>
<b-row>

  <b-col md="6 order-md-2">
    <img src="../assets/login-image.jpg" class="img-fluid">
  </b-col>

  <b-col md="6 contents">
    <b-row class="justify-content-center">
      <b-col md="8">

        <div class="mb-4">
          <h3>Sign-in to <b>College</b></h3>
          <p class="mb-4">Please enter the correct credentials to sign-in to the college system.</p>
        </div>

        <b-form>
          <b-form-group label="Email Address">
            <b-form-input type="email" v-model="form.email" placeholder="example@email.com" />
          </b-form-group>

          <b-form-group class="mb-4" label="Password">
            <b-form-input type="password" v-model="form.password" />
          </b-form-group>

          <div class="d-flex mb-5 align-items-center">
            <b-form-checkbox>Remember Me</b-form-checkbox>
            <span class="ml-auto">
              <a href="#">Forgot Password</a>
            </span>
          </div>

          <b-button class="login-button" @click="login()" pill variant="primary">Login</b-button>

          <div class="justify-content-center mt-5">
            <p>Not a member? <strong>
                <router-link :to="{ name: 'register'}">Register now</router-link>
              </strong></p>
          </div>
        </b-form>

      </b-col>
    </b-row>
  </b-col>
</b-row>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LoginForm',
  components: {

  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          this.$emit('login');
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

<style scoped>
p {
  color: #b3b3b3;
  font-weight: 300;
}

.contents {
  width: 50%;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

img {
  vertical-align: middle;
  border-style: none;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.login-button {
  height: 54px;
  width: 100%;
}
</style>
