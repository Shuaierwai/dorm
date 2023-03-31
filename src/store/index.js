import Vue from "vue";
import Vuex from "vuex";

import { loginPort } from "../api/loginApi";
import { routerAdminList, routerSurAdminList } from "../router/modules/routers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerList: [],
    userName: "",
    passWord: "",
  },
  getters: {
    getRouterList(state) {
      return state.routerList;
    },
  },
  mutations: {
    // setRouterList(state, data) {
    //   state.routerList = data;
    // },
    login(state, data) {
      // state.userName = data.userName;
      // state.passWord = data.password;
      state.routerList=data
    },
  },
  actions: {
    async login({ commit }, data) {
      console.log("data", data);
      let res = await loginPort(data);
      console.log(res);
      if (res.data.code == 200) {
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.data[0].u_type)
        );
        sessionStorage.setItem(
          "userName",
          JSON.stringify(res.data.data[0].u_name)
        );
        sessionStorage.setItem(
          "userId",
          JSON.stringify(res.data.data[0].u_id)
        );
        sessionStorage.setItem("token", res.data.token);

        // console.log(res.data.power);
        commit("login",res.data.power);
        return Promise.resolve("111");
      } else if (res.data.data.length == 0) {
        return Promise.reject("错误");
      }
    
     
    },
  },
  modules: {},
});
