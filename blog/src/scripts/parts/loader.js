const loader = document.querySelector(".loader");
const curtain = document.querySelector(".black-back");

export function openLoader() {
  loader.classList.remove("is-hidden");
  curtain.classList.remove("is-hidden");
}

export function closeLoader() {
  loader.classList.add("is-hidden");
  curtain.classList.add("is-hidden");
}
