import { html, render } from "https://unpkg.com/lit-html@latest";

/******************************************************************************
 * Propagation des événements
 ******************************************************************************/

const $output = document.querySelector("#output");
const $div = document.querySelector("#container");
const $button = document.querySelector("button");

const handle = (event) => {
  $output.textContent += `Clicked ${event.currentTarget.tagName}\n`;
};

document.body.addEventListener("click", handle);
$div.addEventListener("click", handle);
$button.addEventListener("click", handle);

/******************************************************************************
 * Gallerie de chats
 ******************************************************************************/

/******************************************************************************
 * Methode avec les promesses
 ******************************************************************************/
// Recuperation de la gallerie
const ma_gallerie = document.querySelectorAll("#cats-container");
// Creation de la promesse
const promesse = fetch("https://api.thecatapi.com/v1/images/search?limit=10");
promesse.then((reponse) => {
  reponse.json().then((data) => {
    ma_gallerie.forEach((container) => {
      data.forEach((cat) => {
        const $cat = document.createElement("img");
        $cat.src = cat.url;
        container.append($cat);
      });
    });
  });
});

// Avec Async et await


/******************************************************************************
 * Exemple de faille XSS
 ******************************************************************************/

// const $xss = document.createElement("div");
// $xss.innerHTML = `<img src="!" onerror="alert('XSS')"> `;
// document.body.append($xss);

/******************************************************************************
 * Ajout d'Alice
 ******************************************************************************/

const $aliceContainer = document.querySelector("#alice-container");
const $template = document.querySelector("#alice-template");
for (let index = 0; index < 3; index++) {
  const $alice = $template.content.cloneNode(true);
  $aliceContainer.append($alice);
}

/******************************************************************************
 * Exemple lit-html
 ******************************************************************************/

const aliceLit = (id, source) =>
  html`
    <figure>
      <img
        class="alice blue"
        id=${id}
        src=${source}
        role="img"
        alt="Silhouette"
        width="300"
      />
      <figcaption>
        Silhouette of crouching long haired character in dress and short boots
      </figcaption>
    </figure>
  `;

const aliceTemplate = aliceLit(42, "alice.svg");
render(aliceTemplate, document.querySelector("#lit-container"));
console.debug(aliceTemplate);
