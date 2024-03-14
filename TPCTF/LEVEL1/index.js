// Get dom elements
const buttonGetChallenge = document.querySelector("#get_challenge_button");
const inputUrl = document.querySelector("#input_url");
const inputChallenge = document.querySelector("#input_challenge");
const buttonSubmit = document.querySelector("#button_submit");
const buttonGoHome = document.querySelector("#button_home");

const dataChallengeSection = document.querySelector("#challenge_section");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// Handler for get challenge button

// Function to get URL for access level 1.

async function getUrlLevel1() {
  try {
    const response = await fetch("https://lifweb.univ-lyon1.fr/level/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const urlData = await response.json();
    //debug
    // console.log(urlData);
    return urlData;
  } catch (error) {
    console.error(`Error to get challenge api: ${error}`);
  }
}

// Function to start level 1
async function startLevel1() {
  try {
    const urlData = await getUrlLevel1();
    const response = await fetch(urlData["href"], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const level1Data = await response.json();
    //debug
    // console.log(level1Data);
    return level1Data;
  } catch (error) {
    console.error(`Error to start level 1 api: ${error}`);
  }
}

// Function to display challenge and url for level 1
async function displayChallenge() {
  // Get Data
  const level1Data = await startLevel1();

  // Clear input
  inputUrl.value = "";
  inputChallenge.value = "";

  // Display data
  dataChallengeSection.innerHTML = "";
  const messageChallenge = document.createElement("p");
  messageChallenge.innerText = `
  Url : ${level1Data["href"]}
  Challenge : ${level1Data["challenges"][0]}`;
  // Style
  messageChallenge.className = "subtitle";
  messageChallenge.style.color = "#efefef";
  messageChallenge.style.fontWeight = "900";
  messageChallenge.style.fontSize = "15px";
  dataChallengeSection.append(messageChallenge);
  // Add button copy
  const buttonCopy = document.createElement("button");
  buttonCopy.textContent = "Copy";
  buttonCopy.className = "button is-primary";
  buttonCopy.addEventListener("click", () => {
    inputUrl.value = level1Data["href"];
    inputChallenge.value = level1Data["challenges"][0];
    inputUrl.select();
    buttonCopy.textContent = "Copied";
  });
  dataChallengeSection.append(buttonCopy);
}

buttonGetChallenge.addEventListener("click", async () => {
  await displayChallenge();
});

// Handler for submit button

// function to display status
function displayStatus(data) {
  //main blur
  const mainSection = document.querySelector("#main_section");
  mainSection.style.filter = "blur(3px)";

  // Create div
  const divStatus = document.createElement("div");
  divStatus.style.width = "50%";
  divStatus.style.height = "50%";
  divStatus.style.position = "absolute";
  divStatus.style.display = "flex";
  divStatus.style.justifyContent = "center";
  divStatus.style.alignItems = "center";
  divStatus.style.borderRadius = "10px";
  divStatus.style.backgroundColor = "#efefef55";

  // Success message
  let text =
    data["success"]["challenge"] === true &&
    data["success"]["stage"] === true &&
    data["success"]["level"] === true
      ? "Challenge Accepted"
      : "Challenge Rejected";

  // Message status
  const messageStatus = document.createElement("p");
  messageStatus.innerText = `
  The request took : ${data["duration_ms"]} ms
    ${text}
  `;
  messageStatus.className = "subtitle";
  messageStatus.style.color = "black";
  messageStatus.style.fontWeight = "900";
  messageStatus.style.textAlign = "center";

  divStatus.append(messageStatus);

  document.body.append(divStatus);
  // Remove message status
  setTimeout(() => {
    divStatus.remove();
    mainSection.style.filter = "none";
    dataChallengeSection.innerHTML = "";
    inputUrl.value = "";
    inputChallenge.value = "";
  }, 3000);
}

// function to check challenge

async function checkChallenge() {
  try {
    const response = await fetch(inputUrl.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        challenge: inputChallenge.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Error to check challenge");
    }
    const checkData = await response.json();
    //debug
    // console.log(checkData);
    displayStatus(checkData);
    return checkData;
  } catch (error) {
    console.error(`Error to check challenge api: ${error}`);
  }
}

buttonSubmit.addEventListener("click", async () => {
  buttonSubmit.className = "button is-large is-loading";
  setTimeout(async () => {
    buttonSubmit.className = "button is-large is-primary";
    await checkChallenge();
  }, 1000);
});

// handler for go home
buttonGoHome.addEventListener("click", () => {
  window.location.href = "../index.html";
});
