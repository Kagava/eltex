const loader = document.querySelector(".loader");
const curtain = document.querySelector(".black-back");
const adrminPanel = document.querySelector(".admin-panel");

export function openLoader() {
  loader.classList.remove("is-hidden");
  curtain.classList.remove("is-hidden");
  adrminPanel.style.zIndex = "1";
}

export function closeLoader() {
  adrminPanel.style.zIndex = "2";
  loader.classList.add("is-hidden");
  curtain.classList.add("is-hidden");
}
