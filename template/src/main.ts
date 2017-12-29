{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
/* eslint-disable import/no-unassigned-import */
import "es6-promise/auto";
/* eslint-enable import/no-unassigned-import */

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App";
{{#router}}
import router from "./router";
{{/router}}

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    "el": "#app",
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    "render": (h) => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    "template": "<App/>",
    "components": { App }
    {{/if_eq}}
});
