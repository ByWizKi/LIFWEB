// On récupère le bouton
const btn = document.querySelector("#btn");
console.log("hello world");

// Clés API
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// URL
const url = "https://lifweb.univ-lyon1.fr/level/1";

// Fonction pour récupérer l'url pour demarrer le level 1
async function startLevel1() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// Fonction pour recuperer l'url de check du level 1 et on recupere la cle challange
async function checkLevel1() {
  try {
    const responseStartLevel1 = await startLevel1();
    const url = responseStartLevel1["href"];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// Fonction pour lancer le level 1
async function confirmLevel1() {
  try {
    const responseCheckLevel1 = await checkLevel1();
    const chanllenge = responseCheckLevel1["challenge"];
    const url = responseCheckLevel1["href"];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: chanllenge,
      }),
    });
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}
// Fonction qui post le chanllenge a l'url recu

// handler du bouton

btn.addEventListener("click", async () => {
  await checkLevel1();
});
