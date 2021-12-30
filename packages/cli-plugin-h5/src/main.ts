import { createApp } from 'vue'
import App from './App.vue'
import './style/index.scss'
import router from './router'
import { getQueryToJson } from './utils/tools'
import store from './store'

console.log(getQueryToJson().__test__)
if (process.env.VUE_APP_VCONSOLE || getQueryToJson().__test__) {
  require('./utils/vconsole')
}

createApp(App).use(store).use(router).mount('#app')
// createApp(App).use(router).mount('#app')
