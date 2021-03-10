/**
 * @Date:   2021-03-10T10:56:43+00:00
 * @Last modified time: 2021-03-10T10:57:44+00:00
 */
 import Vue from "vue";


//save our state (isPanel open or not)
 export const store = Vue.observable({
     isNavOpen: false
 });

 //Call toggleNav anywhere we need it in our application
 export const mutations = {
     toggleNav() {
         store.isNavOpen = !store.isNavOpen
     }
 };
