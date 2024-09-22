import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./registerServiceWorker";
import theme from "./theme";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.provide("theme", theme);

app.mount("#app");
