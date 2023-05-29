import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "~/styles/index.scss";
import "uno.css";
import "element-plus/theme-chalk/src/message.scss";
import * as VueRouter from 'vue-router'
import HelloWorldVue from "./components/HelloWorld.vue";
import TimeTrackerVue from "./components/TimeTracker.vue";
import TimeTrackerSummaryVue from "./components/TimeTrackerSummary.vue";

// routes definition
const routes = [
  { path: '/', component: HelloWorldVue },
  { path: '/time-tracker', 
    children: [
      { path: '', component: TimeTrackerVue },
      { path: 'summary', component: TimeTrackerSummaryVue },
    ]
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
