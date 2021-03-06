/**
 * @Date:   2021-02-17T11:01:49+00:00
 * @Last modified time: 2021-03-05T18:18:54+00:00
 */

import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue'

import router from './router'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
