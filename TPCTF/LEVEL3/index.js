// Get dom elements
const buttonStartChallenge = document.querySelector("#start_challenge_button");
const buttonHome = document.querySelector("#button_home");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// handler for start challenge

async function getUrlLevel3() {
  try {
    const response = await fetch("https://lifweb.univ-lyon1.fr/level/3", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Error to get url");
    }
    const urlData = await response.json();
    //debug
    // console.log(level3Data);
    return urlData;
  } catch (error) {
    console.error(`Error to get url: ${error}`);
  }
}

async function startChallengeLevel3(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Error to start challenge");
    }
    const level3Data = await response.json();
    //debug
    // console.log(level3Data);
    return level3Data;
  } catch (error) {
    console.error(`Error to start challenge api: ${error}`);
  }
}

// display status
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
  }, 3000);
}

async function checkChallengeLevel3() {
  try {
    const urlData = await getUrlLevel3();
    let url = urlData["href"];
    let numberOfChallenge = 3;
    let checkData;
    do {
      let dataStartChallenge = await startChallengeLevel3(url);
      let response = await fetch(dataStartChallenge["href"], {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge: dataStartChallenge["challenges"][0],
        }),
      });
      checkData = await response.json();
      //debug
      // console.log(checkData);
      url = checkData["next"];
      numberOfChallenge--;
    } while (numberOfChallenge > 0);

    displayStatus(checkData);
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

buttonStartChallenge.addEventListener("click", async () => {
  buttonStartChallenge.className = "button is-large is-loading";
  setTimeout(async () => {
    buttonStartChallenge.className = "button is-primary is-large";
    await checkChallengeLevel3();
  }, 1000);
});

buttonHome.addEventListener("click", () => {
  window.location.href = "../index.html";
});
