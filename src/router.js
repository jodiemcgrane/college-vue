/**
 * @Date:   2021-02-17T11:08:57+00:00
 * @Last modified time: 2021-03-02T10:00:39+00:00
 */
import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome'
import Home from './views/Home'
import Register from './views/Register'

import CoursesIndex from './views/courses/Index'
import CoursesCreate from './views/courses/Create'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'

import EnrolmentsIndex from './views/enrolments/Index'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    //coure routes
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses',
      name: 'courses_create',
      component: CoursesCreate
    },
    //enrolments routes
    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },
    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
  ]
});
