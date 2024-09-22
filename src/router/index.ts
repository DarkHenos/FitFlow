import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PresentationView from "../views/PresentationView.vue";
import WidgetsView from "../views/WidgetsView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "presentation",
    component: PresentationView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/widgets",
    name: "widgets",
    component: WidgetsView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
