// On recup les elements du dom
const btn = document.querySelector("#btn");

// On recup la cle API
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// URL
const url = "https://lifweb.univ-lyon1.fr/level/4";

// Fonction pour recup l'url pour demarrer le level 4
async function level4() {
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
//fonction start
async function startLevel4(url) {
  try {
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

async function checkLevel4() {}

// handler du bouton

btn.addEventListener("click", async () => {
  try {
    const response = await checkLevel4();
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
});
