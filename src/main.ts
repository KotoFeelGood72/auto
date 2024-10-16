import "./assets/css/app.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Icons from "@/components/Icons.vue";
import App from "./App.vue";
import router from "./router";
import { initYandexMetrika } from 'yandex-metrika-vue3';

const app = createApp(App);
app.component("Icons", Icons);
app.use(createPinia());
app.use(router);

// app.use(initYandexMetrika, {
//     id: XXXXXXXX,
//     router: router,
//     env: process.env.NODE_ENV
//     // other options
// })

app.mount("#app");
