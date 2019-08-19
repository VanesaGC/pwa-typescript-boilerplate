import Vue from "vue";
import App from "./App.vue";

// XMLHttpRequest
import { getAllCategories } from "./API/categoriesApi";

new Vue({
  render: h => h(App)
}).$mount("#root");

getAllCategories();
