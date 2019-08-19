const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  // '/',
  "index.html",
  "css/appStyles.css",
  "js/app.js"
];

const APP_SHELL_INMUTABLE = [
  "https://fonts.googleapis.com/css?family=Lato:400,300"
];

self.addEventListener("install", e => {
  console.log("Install");
});

self.addEventListener("activate", e => {
  console.log("Activate");
});

self.addEventListener("fetch", e => {
  console.log("fetch");
});
