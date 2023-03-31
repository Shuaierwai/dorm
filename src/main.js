import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/style/index.css"; //比较常用的样式   文件内容只能添加不能修改
import "./assets/style/reset.css"; //重置样式文件

//映入图表第三方工具

import * as echarts from 'echarts';
//引入处理表格
import * as xlsx from 'xlsx'



// ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.prototype.$echarts = echarts
Vue.prototype.$xlsx = xlsx
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
