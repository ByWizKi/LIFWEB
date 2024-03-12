// on recupe les elements du dom
const btn = document.querySelector("#btn");
const time_message = document.querySelector("#time_message");

// On recupe l'url du level 2
const url = "https://lifweb.univ-lyon1.fr/level/3";

// On recupe la cle API
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// On recupe l'url pour commencer le level 2
async function level3() {
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
async function startLevel3(url) {
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

// function check level 3
async function checkLevel3() {
  try {
    const responseUrlLevel3 = await level3();
    let url = responseUrlLevel3["href"];
    let i = 3;
    do {
      let responseStartLevel3 = await startLevel3(url);
      let responseCheckLevel3 = await fetch(responseStartLevel3["href"], {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge: responseStartLevel3["challenges"][0],
        }),
      });
      let data = await responseCheckLevel3.json();
      //debug
      console.log(data);
      url = data["next"];
      i--;
    } while (i > 0);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// handler du bouton
btn.addEventListener("click", async () => {
  try {
    const response = await checkLevel3();
    const resultChecking = await fetch("https://lifweb.univ-lyon1.fr/users", {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await resultChecking.json();
    console.log(data);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
});
