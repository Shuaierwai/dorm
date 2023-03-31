import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import store from "@/store";

import { routerAdminList, routerSurAdminList } from "../router/modules/routers";

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "login",
//     component: login,
//     meta: { isAuth: true, title: "登录" },
//   },
//   {
//     path: "/container",
//     name: "container",
//     component: () => import("../views/ContainerView.vue"),
//     // meta: { isAuth: true },
//     // redirect: "/container/workHome",
//     // children: [],
//   },
//   {
//     path: "*",
//     name: "error",
//     meta: { isAuth: true },
//     component: () => import("../views/Error.vue"),
//   },
// ];
const routes = [
  {
    path: "/",
    name: "login",
    component: login,
    meta: { isAuth: true, title: "登录" },
  },
  {
    path: "/container",
    name: "container",
    meta: { isAuth: false },
    component: () => import("../views/ContainerView.vue"),
    redirect: "/container/workHome",
    children: [
      {
        path: "/container/workHome",
        name: "workHome",
        meta: { isAuth: false },
        component: () => import("../views/WorkHome/WorkHome.vue"),
        meta: { title: "首页" },
      },
      {
        path: "/container/student",
        name: "student",
        meta: { isAuth: false },
        component: () => import("../views/Student/Student.vue"),
        meta: { title: "学生管理" },
      },
      {
        path: "/container/dormitoryManagement",
        name: "dormitoryManagement",
        meta: { isAuth: false },
        component: () =>
          import("../views/DormitoryManagement/DormitoryManagement.vue"),
        meta: { title: "寝室管理" },
      },
      {
        path: "/container/notice",
        name: "notice",
        meta: { isAuth: false },
        component: () => import("../views/Notice/Notice.vue"),
        meta: { title: "公告管理" },
      },
      {
        path: "/container/payment",
        name: "payment",
        meta: { isAuth: false },
        component: () => import("../views/Payment/Payment.vue"),
        meta: { title: "缴费记录管理" },
      },
      {
        path: "/container/maintenance",
        name: "maintenance",
        meta: { isAuth: false },
        component: () => import("../views/Maintenance/Maintenance.vue"),
        meta: { title: "维修记录管理" },
      },
      {
        path: "/container/carousel",
        name: "carousel",
        meta: { isAuth: false },
        component: () => import("../views/Carousel/Carousel.vue"),
        meta: { title: "轮播图管理" },
      },
      {
        path: "/container/admin",
        name: "admin",
        meta: { isAuth: false },
        component: () => import("../views/Admin/Admin.vue"),
        meta: { title: "宿管管理" },
      },
      {
        path: "/container/personalInformation",
        name: "personalInformation",
        meta: { isAuth: false },
        component: () =>
          import("../views/PersonalInformation/PersonalInformation.vue"),
        meta: { title: "个人信息管理" },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem("token");
  // let user = window.sessionStorage.getItem("userInfo");

  if (token && to.path == "/") next({ path: "/container" });
  if (!token && to.path != "/") next({ path: "/" });
  // console.log(changeComponent(store.state.routerList), 0);

//   if ( store.state.routerList.length == 0) {
//       console.log('执行力');
//       let routers = changeComponent(store.state.routerList);
//       console.log("routers", routers);
//       routers.forEach((item) => {
//         router.addRoute("container", item);
//       });

//     // next({ ...to, replace: true })
//   }

  next();
});

// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem("token");
//   if (!token) {
//     console.log(1);
//     if (to.path == "/") {
//       next({ path: "/login" });
//     }
//     if (store.getters.routerList.length) {
//       next();
//     } else {
//       JSON.parse(sessionStorage.getItem("userInfo")) == "0"
//         ? store.commit("setRouterList", changeComponent(routerSurAdminList))
//         : store.commit("setRouterList", changeComponent(routerAdminList));

//       store.state.routerList.forEach((item) => {
//         router.addRoute("container", item);
//       });
//       next({ ...to, replace: true });
//     }
//   } else {
//     if (to.path != "/container") {
//       next({ path: "/container" });
//     } else {
//       next();
//     }

//   }
// });
// console.log(router);
// function changeComponent(com) {
//   let newRouter = com.map((item) => {
//     return {
//       path: item.path,
//       name: item.name,
//       component: () =>
//         import(`../views/${item.component}/${item.component}.vue`),
//       meta: { title: item.title },
//     };
//   });
//   return newRouter;
// }

export default router;

// [
//   {
//     path: "/",
//     name: "login",
//     component: login,
//     meta: { title: "登录" },
//   },
//   {
//     path: "/container",
//     name: "container",
//     component: () => import("../views/ContainerView.vue"),
//     redirect:'/container/workHome',
//     children: [
//       {
//         path: "/container/workHome",
//         name: "workHome",
//         component: () => import("../views/WorkHome/WorkHome.vue"),
//         meta: { title: "首页" },
//       },
//       {
//         path: "/container/student",
//         name: "student",
//         component: () => import("../views/Student/Student.vue"),
//         meta: { title: "学生管理" },
//       },
//       {
//         path: "/container/dormitoryManagement",
//         name: "dormitoryManagement",
//         component: () =>
//           import("../views/DormitoryManagement/DormitoryManagement.vue"),
//         meta: { title: "寝室管理" },
//       },
//       {
//         path: "/container/notice",
//         name: "notice",
//         component: () => import("../views/Notice/Notice.vue"),
//         meta: { title: "公告管理" },
//       },
//       {
//         path: "/container/payment",
//         name: "payment",
//         component: () => import("../views/Payment/Payment.vue"),
//         meta: { title: "缴费记录管理" },
//       },
//       {
//         path: "/container/maintenance",
//         name: "maintenance",
//         component: () =>
//           import("../views/Maintenance/Maintenance.vue"),
//         meta: { title: "维修记录管理" },
//       },
//       {
//         path: "/container/carousel",
//         name: "carousel",
//         component: () =>
//         import("../views/Carousel/Carousel.vue"),
//         meta: { title: "轮播图管理" },
//       },
//       {
//         path: "/container/admin",
//         name: "admin",
//         component: () => import("../views/Admin/Admin.vue"),
//         meta: { title: "宿管管理" },
//       },
//       {
//         path: "/container/personalInformation",
//         name: "personalInformation",
//         component: () =>
//           import("../views/PersonalInformation/PersonalInformation.vue"),
//         meta: { title: "个人信息管理" },
//       },
//     ],
//   },
// ],
