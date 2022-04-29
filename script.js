const openButton = document.querySelector(".open-nav");
const nav = document.querySelector(".nav");

openButton.addEventListener("click", () => {
  nav.classList.toggle("navigation-open");
});

// add event listener to submit button
// select form input value
// set up form validation (add .display-error class to .error-message)
// add to API base URL
// set up async await request (w. error handling)
// extract short URL from JSON data
// [consider create html template] append original and short URL to .copy-link (& add .display-copy-link)
// save original and short URLs in local storage and render on refresh
// add event listener to copy button
// select closest short URL and copy to clipboard
