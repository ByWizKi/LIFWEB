// on recupe les elements du dom
const btn = document.querySelector("#btn");
const time_message = document.querySelector("#time_message");

// On recupe l'url du level 2
const url = "https://lifweb.univ-lyon1.fr/level/2";

// On recupe la cle API
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// On recupe l'url pour commencer le level 2
async function level2() {
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

// On lance le level 2
async function startLevel2(url) {
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

// On check le level 2
async function checkLevel2() {
  try {
    const responseUrlLevel2 = await level2();
    const responseStartLevel2 = await startLevel2(responseUrlLevel2["href"]);
    const responseCheckLevel2 = await fetch(responseStartLevel2["href"], {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge: responseStartLevel2["challenges"][0],
      }),
    });
    const data = await responseCheckLevel2.json();
    //debug
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// handler du bouton
btn.addEventListener("click", async () => {
  try {
    const response = await checkLevel2();
    console.log(response["success"], response["duration_ms"]);
    const response2 = await fetch("https://lifweb.univ-lyon1.fr/users", {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response2.json();
    console.log(data);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
});
