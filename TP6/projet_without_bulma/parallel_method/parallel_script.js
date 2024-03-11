// Get elements
const file_selector = document.querySelector("#file_selector");
const start_button = document.querySelector("#start_button");
const message_container = document.querySelector("#message_container");
const progress_number = document.querySelector("#progress_number");
const progress_bar = document.querySelector("#progress_bar");
const home_button = document.querySelector("#home_button");

// function initialisation progress bar
function initProgressBar(total) {
  progress_bar.value = 0;
  progress_bar.max = total;
}

// function increment progress bar
function incrementProgressBar() {
  progress_bar.value += 1;
  progress_number.textContent = `${progress_bar.value}/${progress_bar.max}`;
}

// function get file
async function getLinks(file_selected) {
  try {
    const baseUrl = "http://lifweb.pages.univ-lyon1.fr/TP4-JS-GitHub/data/";
    const url = `${baseUrl}${file_selected}`;
    const response = await fetch(url, { method: "GET" });
    //debug
    //console.log(response);
    if (response.ok) {
      const data = await response.json();
      //debug
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.log(`Error in the request: ${error}`);
  }
}

// check link
async function checkLink(link) {
  const uri = new URL(link);
  const apiUri = new URL(`https://api.github.com/repos${uri.pathname}`);
  try {
    const response = await fetch(apiUri, { method: "GET" });
    if (response.ok) {
      //debug
      /*
      const data = await response.json();
      console.log(data.url);
      console.log(data);
*/
      const data = await response.json();

      return {
        isOk: true,
        url: apiUri,
        starsRating: data.stargazers_count,
        nameOwner: data.name,
      };
    } else {
      return { isOk: false, url: apiUri, starsRating: 0, nameOwner: "NONE" };
    }
  } catch (error) {
    console.log(error);
  }
}

// Error Selector
function errorSelector() {
  //blur effect
  const blurEffect = document.createElement("div");
  blurEffect.style.position = "fixed";
  blurEffect.style.backdropFilter = "blur(5px)";
  blurEffect.style.width = "100%";
  blurEffect.style.height = "100%";
  blurEffect.style.top = "0";
  blurEffect.style.left = "0";
  document.body.appendChild(blurEffect);

  //message
  const message = document.createElement("span");
  message.textContent = `Select File Please`;
  message.style.position = "fixed";
  message.style.userSelect = "none";

  message.style.fontSize = "70px";
  message.style.fontWeight = "600";
  message.style.fontFamily = "Fira Sans, sans-serif";

  message.style.color = "#F24A72";
  message.style.textShadow = "#484850 0px 0px 10px";

  document.body.appendChild(message);

  // set timeout
  setTimeout(() => {
    document.body.removeChild(message);
    document.body.removeChild(blurEffect);
  }, 2000);
}

// display link
async function displayLink(linkCheck) {
  const title = document.createElement("h3");
  title.textContent = "OUTPUT";
  const message = document.createElement("p");
  message.textContent =
    linkCheck.url +
    " Rating: " +
    linkCheck.starsRating +
    " Owner: " +
    linkCheck.nameOwner;
  message_container.appendChild(message);
  if (linkCheck.isOk) {
    message.style.color = "#484850";
    message.style.fontFamily = "Fira Sans, sans-serif";
    message.style.fontWeight = "500";
  } else {
    message.style.color = "#F24A72";
    message.style.fontFamily = "Fira Sans, sans-serif";
    message.style.fontWeight = "500";
    message.style.textDecoration = "line-through";
  }
}

// function start
async function start() {
  if (file_selector.value === "") {
    errorSelector();
    return;
  }
  const responseGetLinks = await getLinks(file_selector.value);
  if (!responseGetLinks) {
    console.log("No links found or error fetching links");
    return;
  }

  const links = responseGetLinks.map((element) => element.url);
  initProgressBar(links.length);

  const checkLinkPromises = links.map((link) => checkLink(link));

  const results = await Promise.all(checkLinkPromises);

  results.forEach((linkCheck) => {
    displayLink(linkCheck);
    incrementProgressBar();
  });
}

// add event listener
start_button.addEventListener("click", start);

// function home page
function home() {
  window.location.href = "../index.html";
}

// add event listener
home_button.addEventListener("click", home);

//function change file selector
file_selector.addEventListener("change", () => {
  while (message_container.firstChild) {
    message_container.removeChild(message_container.firstChild);
  }
  const title = document.createElement("h3");
  title.textContent = "OUTPUT";
  title.style.fontSize = "20px";
  title.style.fontWeight = "800";
  title.style.fontFamily = "Fira Sans, sans-serif";
  title.style.color = "#efefef";
  title.style.textAlign = "center";
  title.style.userSelect = "none";
  message_container.appendChild(title);
});
