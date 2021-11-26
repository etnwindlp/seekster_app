import Vue from "vue";
import VueRouter from "vue-router";
import Employee from "@/views/employee.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/employee/",
    name: "employee",
    component: Employee,
  },
  {
    path: "/",
    redirect: "/employee"
  },
  {
    path: "*",
    redirect: "/employee"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// const router = new VueRouter({
//   routes,
//   base: process.env.BASE_URL,
//   mode: "hash",
//   hashbang: false,
// });

export default router;
