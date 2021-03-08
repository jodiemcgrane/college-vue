<!--
@Date:   2021-02-17T11:10:21+00:00
@Last modified time: 2021-03-08T18:42:54+00:00
-->
<template>
<div>
  <b-row class="justify-content-center">
    <!-- {{ loggedIn }} -->

    <b-col class="mt-3" md="8">
      <b-card>
        <div class="card-horizontal">
          <b-col md="6">
            <b-card-text>
              <h3>Courses</h3>
              <p>Here is all the courses currently in the college system. Select below to view all courses.</p>
              <div class="text-center">
                <b-button to="/courses" class="view-all-button mt-3" pill variant="primary" btn-sm>View All</b-button>
              </div>
            </b-card-text>
          </b-col>

          <b-col md="6">
            <div class="img-square-wrapper">
              <img src="../assets/courses-image.jpg" class="img-fluid">
            </div>
          </b-col>
        </div>
      </b-card>
    </b-col>

    <b-col class="mt-3" md="8">
      <b-card>
        <div class="card-horizontal">
          <b-card-text>
            <h3>Enrolments</h3>
            <p>Here is all the enrolments currently in the college system. Select below to view all enrolments.</p>
            <div class="text-center">
              <b-button to="/enrolments" class="view-all-button mt-3" pill variant="primary" btn-sm>View All</b-button>
            </div>
          </b-card-text>


          <b-col md="6">
            <div class="img-square-wrapper">
              <img src="../assets/enrolments-image.jpg" class="img-fluid">
            </div>
          </b-col>
        </div>
      </b-card>
    </b-col>

    <b-col class="mt-3" md="8">
      <b-card>
        <div class="card-horizontal">
          <b-card-text>
            <h3>Lecturers</h3>
            <p>Here is all the lecturers currently in the college system. Select below to view all lecturers.</p>
            <div class="text-center">
              <b-button class="view-all-button mt-3" pill variant="primary" btn-sm>View All</b-button>
            </div>
          </b-card-text>

          <b-col md="6">
            <div class="img-square-wrapper">
              <img src="../assets/lecturers-image.jpg" class="img-fluid">
            </div>
          </b-col>
        </div>
      </b-card>
    </b-col>

  </b-row>
</div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },

}
</script>

<style>
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}

.view-all-button {
  height: 38px;
  width: 35%;
}

.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}
</style>
