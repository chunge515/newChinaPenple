// The Vue build version to load with the `import` command987654321
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import commonTitle from "./components/common/commonTitle.vue";
import '../static/css/main.css'

import breadCrumb from "./components/common/breadCrumb.vue";
Vue.component('breadCrumb', breadCrumb)

import html2canvas from 'html2canvas';

import VueHtmlToPaper from 'vue-html-to-paper';
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.component('commonTitle', commonTitle)

import * as vuePrototype from '../src/api/index.js';
for (let key in vuePrototype) {
  Vue.prototype[key] = vuePrototype[key];
}

Vue.prototype.html2canvas = html2canvas;
require('./mock.js')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
