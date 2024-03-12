// Get element from dom
const challenge_button = document.querySelector("#get_challenge_button");
const submit_button = document.querySelector("#submit_button");
const input_chanllenge = document.querySelector("#input_chanllenge");
const input_url = document.querySelector("#input_url");
const chanllenge_container = document.querySelector("#chanllenge_container");
const container = document.querySelector("#container");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// URL
const url = "https://lifweb.univ-lyon1.fr/level/1";

// function get start url for level 1

async function urlLevel1() {
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

// function start level 1
async function startLevel1(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
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

//handler of challenge button
async function handlerChallenge() {
  try {
    // get data
    const urlStartLevel1 = await urlLevel1();
    const responseStartLevel1 = await startLevel1(urlStartLevel1["href"]);
    const url = responseStartLevel1["href"];
    const challenge = responseStartLevel1["challenges"][0];

    // Put new element in dom
    chanllenge_container.innerHTML = "";
    input_url.value = "";
    input_chanllenge.value = "";
    const challengeText = document.createElement("p");
    challengeText.textContent = challenge;
    chanllenge_container.appendChild(challengeText);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
      try {
        input_url.value = url;
        input_chanllenge.value = challenge;
        copyButton.textContent = "Copied";
        copyButton.disabled = true;
      } catch (error) {
        console.log(`Copy error: ${error}`);
      }
    });
    chanllenge_container.appendChild(copyButton);
  } catch {
    console.log(`Error in handler challenge: ${error}`);
  }
}
//chanllenge button listener
challenge_button.addEventListener("click", async () => {
  try {
    await handlerChallenge();
  } catch (error) {
    console.log(`Error in handler: ${error}`);
  }
});

function outPutScreen(data) {
  // Clear container
  container.innerHTML = "";
  // Put new element in container
  /* title */
  const outPutTitle = document.createElement("h2");
  outPutTitle.textContent = "Output";
  container.appendChild(outPutTitle);
  /*output text*/
  if (
    data["success"]["challenge"] === true &&
    data["success"]["stage"] === true &&
    data["success"]["level"] === true
  ) {
    const outPutText = document.createElement("p");
    outPutText.textContent = `chanllenge: ${data["success"]["challenge"]}\nstage: ${data["success"]["stage"]}\nlevel: ${data["success"]["level"]}\n duration: ${data["duration_ms"]}`;
    container.appendChild(outPutText);
  }
  /*back button*/
  const back_button = document.createElement("button");
  back_button.textContent = "Back";
  back_button.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
  container.appendChild(back_button);
  //debug
  // console.log(data);
}

// handler of submit button
async function handlerSubmit() {
  try {
    const url = input_url.value;
    const challenge = input_chanllenge.value;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge: challenge,
      }),
    });
    const data = await response.json();
    //debug
    // console.log(data);
    outPutScreen(data);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}
// submit button listener
submit_button.addEventListener("click", async () => handlerSubmit());
