const $examples = document.querySelectorAll("#examples li");
const $imageHref = document.querySelector("#image-href");
const $addButton = document.querySelector("#add-button");
const $imageContainer = document.querySelector("#image-container");
let couteur = 0;

$addButton.addEventListener("click", () => {
  const url = new URL($imageHref.value); // URL de l'image

  // Creation de la div qui va permettre de stocker l'image et les boutons
  const image_button_container = document.createElement("div");
  image_button_container.classList.add("image_button_container");
  image_button_container.id = "div" + couteur;

  // Creation de l'image
  const image = document.createElement("img");
  image.src = url.href;
  image_button_container.appendChild(image);

  // Creation du bouton up, down et remove
  const button_up = document.createElement("button");
  button_up.textContent = "Up";
  image_button_container.appendChild(button_up);
  button_up.addEventListener("click", () =>
    handler_up(image_button_container.id)
  );

  // si le bouton est survole on ajoute un handler
  button_up.addEventListener("mouseover", () => {
    handler_mouseover_button(image_button_container.id);
  });

  button_up.addEventListener("mouseout", () => {
    handler_mouseout_button(image_button_container.id);
  });

  const button_down = document.createElement("button");
  button_down.textContent = "Down";
  image_button_container.appendChild(button_down);
  button_down.addEventListener("click", () => {
    handler_down(image_button_container.id);
  });
  // si le bouton est survole on ajoute un handler
  button_down.addEventListener("mouseover", () => {
    handler_mouseover_button(image_button_container.id);
  });

  button_down.addEventListener("mouseout", () => {
    handler_mouseout_button(image_button_container.id);
  });

  const button_remove = document.createElement("button");
  button_remove.textContent = "Remove";
  image_button_container.appendChild(button_remove);
  button_remove.addEventListener("click", () =>
    handler_remove(image_button_container.id)
  );

  // Ajout de la div
  $imageContainer.appendChild(image_button_container);

  // Incrementation du compteur
  couteur++;
});

function handler_up(image_button_container_id) {
  const image_button_container = document.querySelector(
    "#" + image_button_container_id
  );
  //on active les boutons
  const buttons = image_button_container.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = false;
    button.style.background = "#69c62b";
  });

  // On test si c'est pas le dernier element
  if (image_button_container.previousElementSibling !== null) {
    $imageContainer.insertBefore(
      image_button_container,
      image_button_container.previousElementSibling
    );
  }
}
function handler_down(image_button_container_id) {
  const image_button_container = document.querySelector(
    "#" + image_button_container_id
  );
  const buttons = image_button_container.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = false;
    button.style.background = "#69c62b";
  });

  // On test si c'est pas le dernier element
  if (image_button_container.nextElementSibling !== null) {
    $imageContainer.insertBefore(
      image_button_container.nextElementSibling,
      image_button_container
    );
  }
}

function handler_mouseover_button(image_button_container_id) {
  const image_button_container = document.querySelector(
    "#" + image_button_container_id
  );
  // Test si c'est le dernier element
  if (image_button_container.nextElementSibling === null) {
    // On desactive le bouton
    image_button_container.children[2].disabled = true;

    // On met le bouton en rouge
    image_button_container.children[2].style.backgroundColor = "red";
  }

  if (image_button_container.previousElementSibling === null) {
    // On desactive le bouton
    image_button_container.children[1].disabled = true;
    // On met le bouton en rouge
    image_button_container.children[1].style.backgroundColor = "red";
  }
}

function handler_mouseout_button(image_button_container_id) {
  const image_button_container = document.querySelector(
    "#" + image_button_container_id
  );
  // Test si c'est le dernier element
  if (image_button_container.nextElementSibling === null) {
    // On active le bouton
    image_button_container.children[2].disabled = false;
    // On met le bouton en couleur de base
    image_button_container.children[2].style.backgroundColor = "#69c62b";
  }

  if (image_button_container.previousElementSibling === null) {
    // On active le bouton
    image_button_container.children[1].disabled = false;
    // On met le bouton en couleur de base
    image_button_container.children[1].style.backgroundColor = "#69c62b";
  }
}

function handler_remove(image_button_container_id) {
  // On supprime la div
  $imageContainer.removeChild(
    document.querySelector("#" + image_button_container_id)
  );
  console.log("clic sur Remove");
}

$imageHref.addEventListener("input", () => {
  $addButton.disabled = !$imageHref.checkValidity() || $imageHref.value === "";
});

for (const $example of $examples)
  $example.addEventListener("click", () => {
    $imageHref.value = $example.textContent.trim();
    $imageHref.dispatchEvent(new Event("input"));
  });
