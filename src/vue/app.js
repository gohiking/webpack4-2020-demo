import Vue from 'vue'
import store from './store'
// import router from './router'
// import VueYoutube from 'vue-youtube'
// import Vuex from 'vuex'
/**************/
/* Containers */
/**************/
import App from '@vue/containers/App'

// Vue.use(VueYoutube)
/**************/
/* Components */
/**************/
/***************/
/* install Vue */
/***************/

// eslint-disable-next-line
export default function() {
  // eslint-disable-next-line
  new Vue({
    el: '#app',
    store,
    // router,
    render: h => h(App)
  })

  // eslint-disable-next-line
}
