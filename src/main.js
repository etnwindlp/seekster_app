import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue2Filters from "vue2-filters";
import VueAxios from "vue-axios";
import axios from "axios";
import BlockUI from "vue-blockui";
import VueResizeText from "vue-resize-text";
import Notifications from 'vue-notification';
import OtpInput from "@bachdgvn/vue-otp-input";

Vue.component("v-otp-input", OtpInput);

Vue.use(
    Notifications,
    Vue2Filters,
    VueAxios,
    axios,
    BlockUI,
    VueResizeText,
);

Vue.prototype.$liff = window.liff
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");


