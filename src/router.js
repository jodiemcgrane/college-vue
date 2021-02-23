/**
 * @Date:   2021-02-17T11:08:57+00:00
 * @Last modified time: 2021-02-23T09:27:48+00:00
 */
import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome'
import Home from './views/Home'
import Register from './views/Register'

import CoursesIndex from './views/courses/Index'
// import CoursesShow from './views/courses/Show'
// import CoursesEdit from './views/courses/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history', //allows us to use the back button
  base: process.env.BASE_URL,
  routes: [
    //arrays of routes
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    // {
    //   path: '/courses/show',
    //   name: 'courses_show',
    //   component: CoursesShow
    // },
    // {
    //   path: '/courses/edit',
    //   name: 'courses_edit',
    //   component: CoursesEdit
    // },
  ]
});
