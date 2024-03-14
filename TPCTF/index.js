// Get DOM elements
const buttonLevel1 = document.querySelector("#button_level1");
const buttonLevel2 = document.querySelector("#button_level2");
const buttonLevel3 = document.querySelector("#button_level3");
const buttonLevel4 = document.querySelector("#button_level4");
const buttonLevel5 = document.querySelector("#button_level5");

const dataStatusSection = document.querySelector("#data_status_section");
const buttonRefresh = document.querySelector("#button_refresh");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

//handlers for level buttons
buttonLevel1.addEventListener("click", () => {
  window.location.href = "LEVEL1/index.html";
});

buttonLevel2.addEventListener("click", () => {
  window.location.href = "LEVEL2/index.html";
});

buttonLevel3.addEventListener("click", () => {
  window.location.href = "LEVEL3/index.html";
});

buttonLevel4.addEventListener("click", () => {
  window.location.href = "LEVEL4/index.html";
});

buttonLevel5.addEventListener("click", () => {
  window.location.href = "LEVEL5/index.html";
});

// handlers for status section

// function get status data
async function getStatus() {
  try {
    const response = await fetch("https://lifweb.univ-lyon1.fr/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const statusData = await response.json();
    //debug
    // console.log(statusData);
    return statusData;
  } catch (error) {
    console.error(`Error to get status api: ${error}`);
  }
}

// Display status
async function displayStatus() {
  // Get Data
  const statusData = await getStatus();
  const listSuccesses = statusData["successes"];

  // Display data
  dataStatusSection.innerHTML = "";
  listSuccesses.map((success) => {
    const p = document.createElement("p");
    p.textContent = `
    Level : ${success["id_lvl"]} Done ✅ | Number of times : ${success["number_of_times"]} 
    `;
    p.className = "subtitle";
    p.style.color = "#efefef";
    p.style.fontWeight = "900";
    p.style.fontSize = "15px";
    p.maring = "3px";
    dataStatusSection.append(p);
  });
}

// function update status
buttonRefresh.addEventListener("click", async () => {
  await displayStatus();
});
