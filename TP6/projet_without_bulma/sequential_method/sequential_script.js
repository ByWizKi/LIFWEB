// Get elements
const file_selector = document.querySelector("#file_selector");
const start_button = document.querySelector("#start_button");
const message_container = document.querySelector("#message_container");
const progress_number = document.querySelector("#progress_number");
const progress_bar = document.querySelector("#progress_bar"); 
const home_button = document.querySelector("#home_button");

// function intialisation progress bar
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
  const baseUrl = "http://lifweb.pages.univ-lyon1.fr/TP4-JS-GitHub/data/";
  const url = `${baseUrl}${file_selected}`;
  try {
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
      */
      return { isOk: true, url: apiUri };
    } else {
      return { isOk: false, url: apiUri };
    }
  } catch (error) {
    console.log(error);
  }
}

// display link
async function displayLink(linkCheck) {
  const message = document.createElement("p");
  message.textContent = linkCheck.url;
  message_container.appendChild(message);
  if (linkCheck.isOk) {
    message.style.color = "green";
  } else {
    message.style.color = "red";
  }
}

// function start
async function start() {
  const responseGetLinks = await getLinks(file_selector.value);
  const links = responseGetLinks.map((element) => element.url);
  initProgressBar(links.length);

  for (const link of links) {
    await displayLink(await checkLink(link));
    incrementProgressBar();
  }
}

// add event listener
start_button.addEventListener("click", start);


// function home page
function home() {
  window.location.href = "../index.html";
}

// add event listener
home_button.addEventListener("click", home);
