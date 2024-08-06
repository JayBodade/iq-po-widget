import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia';
import { ZOHO } from '@/lib/ZOHO-SDK';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


const pinia = createPinia();
loadFonts()

ZOHO.CREATOR.init()
.then(()=>{
createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
})
