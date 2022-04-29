const openButton = document.querySelector("[data-open-nav]");
const nav = document.querySelector("[data-nav]");
const shortenURLForm = document.querySelector("[data-shorten-url]");
const formInput = document.querySelector("[data-link-input]");
const errorMessage = document.querySelector("[data-error-message]");
const copyButton = document.querySelector("[data-btn-copy]");
let baseURL = "https://api.shrtco.de/v2/shorten?url=";

// add toggle functionality to nav bar
openButton.addEventListener("click", () => {
  nav.classList.toggle("navigation-open");
});

// clear error messages
clearError();

// add functionlity to shorten URL button
shortenURLForm.addEventListener("submit", () => {
  const inputValue = formInput.value;
  const isValidURL = validateInput(inputValue);
  console.log(isValidURL);
});

// Function definitions

function validateInput(input) {
  let regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (regexp.test(input)) {
    return true;
  } else {
    displayError();
    return false;
  }
}

function displayError() {
  errorMessage.classList.add("display-error");
}

function clearError() {
  formInput.addEventListener("click", () => {
    errorMessage.classList.remove("display-error");
  });
}

// add to API base URL
// set up async await request (w. error handling)
// limit request rate to 1/sec
// extract short URL from JSON data
// [consider create html template] append original and short URL to .copy-link (& add .display-copy-link)
// save original and short URLs in local storage and render on refresh
// add event listener to copy button
// select closest short URL and copy to clipboard
