// On récupère le bouton
const btn = document.querySelector("#btn");

// Clés API
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// URL
const url = "https://lifweb.univ-lyon1.fr/level/1";

// Fonction pour recup l'url pour demarrer le level 1
async function level1() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response.json();
    //debug
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// Fonction pour recup l'url de check du level 1 et on recup la cle challange
async function startLevel1() {
  try {
    const responseStartLevel1 = await level1();
    const url = responseStartLevel1["href"];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response.json();
    //debug
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// Fonction pour lancer le level 1
async function checkLevel1() {
  try {
    const reponseCheckLevel1 = await startLevel1();
    const url = reponseCheckLevel1["href"];
    const challange = reponseCheckLevel1["challenges"][0];
    const responseCheckLevel1 = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge: challange,
      }),
    });
    const data = await responseCheckLevel1.json();
    //debug
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// Fonction qui ajoute un texte qui clignote
function blinkTextAnimation(text) {
  // Creation du filtre de flou d'arriere plan
  const blurEffect = document.createElement("div");
  blurEffect.style.position = "fixed";
  blurEffect.style.backdropFilter = "blur(5px)";
  blurEffect.style.width = "100%";
  blurEffect.style.height = "100%";
  blurEffect.style.top = "0";
  blurEffect.style.left = "0";
  document.body.appendChild(blurEffect);

  // Creation du texte
  const blinkText = document.createElement("p");
  blinkText.textContent = text;
  document.body.appendChild(blinkText);

  // Configuration du texte css
  blinkText.style.position = "fixed";
  blinkText.style.top = "50%";
  blinkText.style.left = "50%";
  blinkText.style.transform = "translate(-50%, -50%)";
  blinkText.style.color = "rgba(240, 46, 170, 0.71)";

  blinkText.style.fontFamily = "'Madimi One', sans-serif";
  blinkText.style.fontSize = "70px";
  blinkText.style.textShadow =
    "0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff";

  // Configuration de l'animation js
  let scaleText = 1;
  let opacityText = 1;
  let scaleTextDirection = 0.02;
  let opacityTextDirection = 0.05;

  function animate() {
    opacityText += opacityTextDirection;
    scaleText += scaleTextDirection;

    if (opacityText <= 0 || opacityText >= 1) {
      opacityTextDirection *= -1;
    }

    if (scaleText <= 1 || scaleText >= 1.5) {
      scaleTextDirection *= -1;
    }

    blinkText.style.opacity = opacityText.toString();
    blinkText.style.transform = `translate(-50%, -50%) scale(${scaleText})`;

    requestAnimationFrame(animate);
  }

  animate();

  // Suppression du texte et du flou
  setTimeout(() => {
    document.body.removeChild(blurEffect);
    document.body.removeChild(blinkText);
  }, 4000);
}

// handler du bouton
btn.addEventListener("click", async () => {
  try {
    const response = await checkLevel1();
    const resultChecking = response["success"];
    if (
      resultChecking["challenge"] &&
      resultChecking["stage"] &&
      resultChecking["level"]
    ) {
      blinkTextAnimation("CHALLANGE REUSSI !");
    } else {
      blinkTextAnimation("CHALLANGE ECHOUER !");
    }
  } catch (error) {
    blinkTextAnimation("CHALLANGE ECHOUER !");
    console.log(`Error in api request: ${error}`);
  }
});
