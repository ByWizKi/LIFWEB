// Get dom elements
const buttonStartChallenge = document.querySelector("#start_challenge_button");
const buttonHome = document.querySelector("#button_home");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// handler for start challenge

async function startChallengeLevel5(url) {
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
    const level5Data = await response.json();
    //debug
    // console.log(level5Data);
    return level5Data;
  } catch (error) {
    console.error(`Error to start challenge api: ${error}`);
  }
}

async function checkChallengeLevel5(url, challenge) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        challenge: challenge,
      }),
    });
    if (!response.ok) {
      throw new Error("Error to check challenge");
    }
    const checkData = await response.json();
    //debug
    console.log(checkData);
    return checkData;
  } catch (error) {
    console.error(`Error to check challenge api: ${error}`);
  }
}

async function asyncForEachChallenge(url) {
  const dataStartChallenge = await startChallengeLevel5(url);
  const urlCheckingChallenge = dataStartChallenge["href"];
  const challengeList = dataStartChallenge["challenges"];
  let checkDataAll = [];
  try {
    await Promise.all(
      challengeList.map((challange) => checkChallengeLevel5(urlCheckingChallenge, challange)),
    )
      .then((data) => checkDataAll.push(...data))
      .catch((error) => {
        console.error(`Error to check challenge api: ${error}`);
      });

    //debug
    // console.log(checkDataAll);
    return checkDataAll;
  } catch (error) {
    console.error(`Error to get challenge api: ${error}`);
  }
}

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

// handler for start challenge
buttonStartChallenge.addEventListener("click", async () => {
  buttonStartChallenge.className = "button is-large is-loading";
  setTimeout(async () => {
    buttonStartChallenge.className = "button is-primary is-large";
    await asyncForEachChallenge("https://lifweb.univ-lyon1.fr/level/5/start/1");
    await asyncForEachChallenge("https://lifweb.univ-lyon1.fr/level/5/start/2");
    const checkChallengeLevel5Data = await asyncForEachChallenge(
      "https://lifweb.univ-lyon1.fr/level/5/start/3",
    );
    for (const data of checkChallengeLevel5Data) {
      if (data !== undefined && "duration_ms" in data) {
        displayStatus(data);
      }
    }
  }, 1000);
});

// handler for home
buttonHome.addEventListener("click", () => {
  window.location.href = "../index.html";
});
