// Get element from dom
const btn_level1 = document.querySelector("#level_1");
const btn_level2 = document.querySelector("#level_2");
const btn_level3 = document.querySelector("#level_3");
const btn_level4 = document.querySelector("#level_4");

const btn_refresh = document.querySelector("#btn_refresh");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// listeners
btn_level1.addEventListener("click", () => { 
  window.location.href = "LEVEL1/index.html";
});
btn_level2.addEventListener("click", () => {
  window.location.href = "LEVEL2/index.html";
});
btn_level3.addEventListener("click", () => {
  window.location.href = "LEVEL3/index.html";
});
btn_level4.addEventListener("click", () => {
  window.location.href = "LEVEL4/index.html";
});
