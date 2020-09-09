import Vue from 'vue'
import App from './App.vue'
import router from './router'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: false,
  connection: io('http://' + document.domain + ":" + location.port)
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
