const openButton = document.querySelector("[data-open-nav]");
const nav = document.querySelector("[data-nav]");
const shortenURLForm = document.querySelector("[data-shorten-url]");
const formInput = document.querySelector("[data-link-input]");
const errorMessage = document.querySelector("[data-error-message]");
const template = document.querySelector("#short-link-template");
const shortenURLSection = document.querySelector("[data-section-shorten-url]");
let baseURL = "https://api.shrtco.de/v2/shorten?url=";
const SESSION_STORAGE_PREFIX = "URL_SHORTENING_LANDING";
const LINKS_STORAGE_KEY = `${SESSION_STORAGE_PREFIX}-links`;

// render links saved in session storage
const links = loadLinks();
links.forEach((link) => renderLink(link.originalURL, link.shortURL));

// add toggle functionality to nav bar
openButton.addEventListener("click", () => {
  nav.classList.toggle("navigation-open");
});

// add functionality to shorten URL form
shortenURLForm.addEventListener("submit", () => {
  const inputValue = formInput.value;
  const isValidURL = validateInput(inputValue);

  if (!isValidURL) return;
  const fetchURL = baseURL + inputValue;

  fetchAPI(fetchURL).then((data) => {
    renderLink(inputValue, data.result.short_link);
    saveLinks();
  });

  resetForm();
});

// clear error messages
clearError();

// add functionality to copy buttons
shortenURLSection.addEventListener("click", (e) => {
  if (!e.target.matches("[data-btn-copy]")) return;

  const targetURL = e.target.previousElementSibling.innerText;
  copyURL(targetURL);

  const targetButton = e.target;
  targetButton.style.backgroundColor = "#222127";
  targetButton.innerText = "Copied";
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

async function fetchAPI(url) {
  try {
    const res = await fetch(url);
    console.log(res.ok, res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function renderLink(originalURL, shortURL) {
  const templateClone = template.content.cloneNode(true);

  const renderLinkDiv = templateClone.querySelector("[data-copy-link]");
  const originalURLElement = templateClone.querySelector("[data-url-original]");
  const shortURLElement = templateClone.querySelector("[data-url-short]");

  originalURLElement.innerText = originalURL;
  shortURLElement.innerText = shortURL;

  links.push({ originalURL: originalURL, shortURL: shortURL });
  shortenURLSection.appendChild(renderLinkDiv);
}

function resetForm() {
  formInput.value = "";
  formInput.placeholder = "Shorten a link here..";
}

function loadLinks() {
  const linksString = sessionStorage.getItem(LINKS_STORAGE_KEY);
  return JSON.parse(linksString) || [];
}

function saveLinks() {
  sessionStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
}

function copyURL(url) {
  navigator.clipboard.writeText(url).then((res) => {
    console.log("url copied to clipboard successfully");
  });
}
