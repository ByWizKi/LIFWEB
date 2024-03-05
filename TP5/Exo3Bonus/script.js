// get form button
const btnSend = document.querySelector("#form_button");

// function send form
async function fetchForm(data) {
  try {
    const response = await fetch("https://httpbin.org/anything", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const { name_response, surname_response } = responseData.json;
      const { name_form, surname_form } = parseData(
        document.querySelector("#form")
      );

      if (name_response === name_form && surname_response === surname_form) {
        // debug
        //console.log("data send");
        return true;
      } else {
        //debug
        //console.log("data not send");
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// parse data
function parseData(data) {
  const formData = new FormData(data);
  return Object.fromEntries(formData.entries());
}

// handler error input
function handleError(id) {
  // style element created
  const element = document.createElement("style");
  document.head.appendChild(element);

  if (id === "#name") {
    document.querySelector("#name").style.backgroundColor = "#e54233";
    document.querySelector("#name").placeholder = "Veuillez entrer un prenom !";
    element.sheet.insertRule(`#name::placeholder { color: white; }`, 0);
  } else {
    document.querySelector("#surname").style.backgroundColor = "#e54233";
    document.querySelector("#surname").placeholder = "Veuillez entrer un nom !";
    element.sheet.insertRule(`#surname::placeholder { color: white; }`, 0);
  }
}

// function undifined test
function isUndefined(text) {
  return text === undefined;
}
// function trim test
function isOnlySpaces(text) {
  if(text === undefined) {
    return true;
  }
  return text.trim().length === 0;
}

// function number test
function containsNumber(text) {
  return /\d/.test(text);
}

// handler button
btnSend.addEventListener("click", (event) => {
  // get date from form
  const data = parseData(document.querySelector("#form"));
  // send data
  const { name_form, surname_form } = data;
  //debug
  //console.log(name_form, surname_form);
  // test name
  if (
    !isUndefined(name_form) ||
    !isOnlySpaces(name_form) ||
    !containsNumber(name_form)
  ) {
    handleError("#name");
    event.preventDefault();
  } 
  
  // test surname
  if (
    !isUndefined(surname_form) ||
    !isOnlySpaces(surname_form) ||
    !containsNumber(surname_form)
  ) {
    handleError("#surname");
    event.preventDefault();
  }

  // test result
  if(fetchForm(data)){
    
  }
});
