/**
 * @Date:   2021-02-17T11:08:57+00:00
 * @Last modified time: 2021-02-17T11:09:28+00:00
 */
 import Vue from 'vue'
 import Router from 'vue-router'

 import Home from './views/Home'

 Vue.use(Router)

 export default new Router({
   mode: 'history', //allows us to use the back button
   base: process.env.BASE_URL,
   routes: [
     //arrays of routes
     {
       path: '/',
       name: 'home',
       component: Home
     },

   ]
 });
