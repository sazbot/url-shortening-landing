const openButton = document.querySelector(".open-nav");
const nav = document.querySelector(".nav");

openButton.addEventListener("click", () => {
  nav.classList.toggle("navigation-open");
});
