"use strict";
console.info("app.js loading...");
console.log(`il y a ${document.querySelectorAll("li").length} li`);
console.info("...app.js loaded");

// Exo 1

// Declaration des variables
const boutonDemo = document.getElementById("demo-btn");
const boutonCalc = document.getElementById("eval-btn");
//Creation du bouton Raz
const boutonRaz = document.createElement("button");
boutonRaz.innerText = "RàZ";
boutonDemo.parentNode.insertAdjacentElement("afterend", boutonRaz);

// Variable global
let varIncrGlobal = 0;

// Fonction handler pour btnDemo
function btnDemoHandler() {
  console.info("Clic sur le bouton demo");
  varIncrGlobal++;
  document.getElementById("output-code").innerText = `${varIncrGlobal}`;
}
boutonDemo.addEventListener("click", btnDemoHandler);

// Fonction handler pour btnRaZ
function btnRazHandler() {
  console.info("Clic sur le bouton raz");
  varIncrGlobal = 0;
  document.getElementById("output-code").innerText = `${varIncrGlobal}`;
}
boutonRaz.addEventListener("click", btnRazHandler);

// Fonction handler pour btnCalc
function btnCalcHandler() {
  console.info("Clic sur le bouton calculer");
  const inputVal = document.getElementById("input-int").value;
  alert(inputVal ** 2);
}
boutonCalc.addEventListener("click", btnCalcHandler);

//Exo 2

// Creation d'un style
const newStyle = document.createElement("style");
newStyle.innerText = "body.red-mode { background-color: red; color: white; }";
document.head.appendChild(newStyle);

// Creation de la fonction handler pour le bouton toggle-btn
const boutonToggle = document.getElementById("toggle-btn");
function btnToggleHandler() {
  console.info("Clic sur le bouton toggle");
  document.body.classList.toggle("red-mode");
}
boutonToggle.addEventListener("click", btnToggleHandler);

//Exo3

// Fonction handler pour l'image
function handlerImage(event) {
  console.log("clic sur une image");
  event.preventDefault();
  const imageContainer = document.querySelector("#image-container");
  imageContainer.innerHTML = `<img src="${event.target.href}">`;
  const styleImg = document.createElement("style");
  styleImg.innerText = `#image-container img { max-width: 50%; margin: 0 auto; display: block; }`;
  document.head.appendChild(styleImg);

  // Creation du bouton clear
  const btnClear = document.createElement("button");
  const styleBtn = document.createElement("style");
  styleBtn.innerText = `#image-container button { display: block; margin: 20px auto; width: 200px; }`;
  document.head.appendChild(styleBtn);
  btnClear.innerText = "Clear";
  imageContainer.appendChild(btnClear);

  // Handler du bouton clear
  btnClear.addEventListener("click", () => {
    imageContainer.innerHTML = "";
    document.head.removeChild(styleImg);
    document.head.removeChild(styleBtn);
  });
}
const images = document.querySelectorAll("#images-list a");
images.forEach((image) => {
  image.addEventListener("click", handlerImage);
});

// Exo 4
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];

document.onkeydown = konamiHandler;

function konamiHandler(event) {
  console.log(event.key);
  konamiCode.forEach((key) => {
    if (key !== event.key) {
      return;
    } else {
      alert(`Konami code ${event.key}`);
    }
  });
}

// Exo 5
const divMouse = document.createElement("div");
divMouse.id = "mouse-follower";
divMouse.className = "dot";

const styleMouse = document.createElement("style");
styleMouse.innerText = `.dot {
pointer-events: none;
height: 50px;
width: 50px;
background-color: #bbb;
border-radius: 50%;
display: inline-block;
position: absolute; }`;

let timer;
function handlerMouse(event) {
  document.body.appendChild(divMouse);
  document.head.appendChild(styleMouse);

  let mouseX = event.clientX;
  let mouseY = event.clientY;

  document.onmousemove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  timer = setInterval(() => {
    divMouse.style.top = `${mouseY}px`;
    divMouse.style.left = `${mouseX}px`;
  }, 1);
}

const btnFollow = document.getElementById("mouse-btn");
btnFollow.addEventListener("click", handlerMouse);

document.onkeydown = (event) => {
  if (event.key === "q") {
    document.body.removeChild(divMouse);
    clearInterval(timer);
  }
};

// Exo 6
// tableau triable

// On recupere les columns du tableau
const table = document.querySelector("table");

table.addEventListener("click", (event) => {
  if (event.target.tagName === "TH") {
    if (event.target.innerText === "Name") {
      console.log("a");
      let rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        console.log(row.cells[1].innerText);
      });
    } else {
      console.log("b");
      let rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        triString(row.cells[0].innerText);
      });
    }
  }
});

function triString(string) {
  string.forEach((element) => {
    console.log(element);
  });
}
