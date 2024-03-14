// Get dom elements
const buttonStartChallenge = document.querySelector("#start_challenge_button");
const buttonHome = document.querySelector("#button_home");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// handler for start challenge

async function getUrlLevel4() {
  try {
    const response = await fetch("https://lifweb.univ-lyon1.fr/level/4", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Error to get challenge");
    }
    const urlData = await response.json();
    //debug
    // console.log(urlData);
    return urlData;
  } catch (error) {
    console.error(`Error to get challenge api: ${error}`);
  }
}

async function startChallengeLevel4(url) {
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
    const level4Data = await response.json();
    //debug
    // console.log(level4Data);
    return level4Data;
  } catch (error) {
    console.error(`Error to start challenge api: ${error}`);
  }
}

async function checkChallengeLevel4(url, challenge) {
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
    // console.log(checkData);
    return checkData;
  } catch (error) {
    console.error(`Error to check challenge api: ${error}`);
  }
}

async function asyncForEachChallenge() {
  const urlLevel4 = await getUrlLevel4();
  const dataStartChallenge = await startChallengeLevel4(urlLevel4["href"]);
  const urlCheckingChallenge = dataStartChallenge["href"];
  const challengeList = dataStartChallenge["challenges"];
  let checkDataAll = [];
  try {
    await Promise.all(
      challengeList.map((challange) => checkChallengeLevel4(urlCheckingChallenge, challange)),
    )
      .then((data) => checkDataAll.push(...data))
      .catch((error) => {
        console.error(`Error to check challenge api: ${error}`);
      });

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
    const checkChallengeLevel4Data = await asyncForEachChallenge();
    for (const data of checkChallengeLevel4Data) {
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
