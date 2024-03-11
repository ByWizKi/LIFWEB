// GET buttons
const sequential_button = document.querySelector("#sequential_button");
const parallel_button = document.querySelector("#parallel_button");

// function sequential
function sequentialHandler() {
  window.location.href = "sequential_method/sequential.html";
  //debug
  //console.log("Sequential");
}

// function parallel
function parallelHandler() {
  window.location.href = "parallel_method/parallel.html";
  //debug
  //console.log("parallel");
}

// add event listener
sequential_button.addEventListener("click", sequentialHandler);
parallel_button.addEventListener("click", parallelHandler);