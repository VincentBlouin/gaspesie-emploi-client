// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Panel from '@/components/shared/Panel'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Store from '@/store'
import DateUtil from '@/dateUtil'

DateUtil.setup()
Vue.component('panel', Panel)

Vue.use(Vuetify, {
  theme: {
    primary: '#fa1e1e',
    secondary: '#1e1efa',
    accent: '#1B5E20',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Store,
  components: { App },
  template: '<App/>'
})
