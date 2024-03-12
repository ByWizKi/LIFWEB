// Get element from dom
const btn = document.querySelector("#btn");

// Api key
const apiKey = "5edd2a9f-cb69-489b-b958-59bb004de5d7";

// URL
const url = "https://lifweb.univ-lyon1.fr/level/4";

//Object url, challange

// Function level 4
async function level4() {
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

//Function start level 4
async function startLevel4(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const data = await response.json();
    //debug
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

async function checkLevel4(url, challange) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge: challange,
      }),
    });
    const data = await response.json();
    //debug
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
}

// handler du bouton
btn.addEventListener("click", async () => {
  try {
    const getStartUrl = await level4();
    const getData = await startLevel4(getStartUrl["href"]);
    const urlChecking = getData["href"];
    const challangeList = getData["challenges"];
    Promise.all (
      challangeList.map((challange) => checkLevel4(urlChecking, challange))
    ).then((data) => console.log(data));

  } catch (error) {
    console.log(`Error in api request: ${error}`);
  }
});
