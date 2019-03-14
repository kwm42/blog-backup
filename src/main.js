import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueFullPage from 'vue-fullpage.js'
import Axios from 'axios';

import '../node_modules/animate.css/animate.css'
import '../node_modules/fullpage.js/dist/fullpage.css'
import './static/css/basic.css'
import './static/css/custom.css'
import './static/css/color.css'

Vue.config.productionTip = false

Vue.use(VueFullPage)
Vue.prototype.$axios=Axios

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
