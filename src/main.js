import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {faBars, faPlay, faXmark, faStop, faX, faRotateRight, faTrash, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faBars, faYoutube, faSpotify, faXmark, faPlay, faStop, faX, faRotateRight, faTrash, faMagnifyingGlass)
/* add icons to the library */

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);

app.mount('#app');