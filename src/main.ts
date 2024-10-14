import "./assets/css/app.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Icons from "@/components/Icons.vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("Icons", Icons);
app.use(createPinia());
app.use(router);

app.mount("#app");
