import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueFullPage from 'vue-fullpage.js'
import Axios from 'axios'
import VueParticles from 'vue-particles'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import '../node_modules/animate.css/animate.css'
import '../node_modules/fullpage.js/dist/fullpage.css'
import './static/css/basic.css'
import './static/css/custom.css'
import './static/css/color.css'

Vue.config.productionTip = false

Vue.use(VueFullPage)
Vue.use(mavonEditor)
Vue.use(VueParticles)

Vue.prototype.$axios=Axios

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
