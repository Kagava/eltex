const loader = document.querySelector(".loader");
const curtain = document.querySelector(".black-back");
const adrminPanel = document.querySelector(".admin-panel");
const formElements = Array.from(
  document.querySelectorAll(".create-artilce__form-item"),
);
const formButtons = Array.from(
  document.querySelectorAll(".create-article__button"),
);
const customsSelect = document.querySelector(".custom-select");

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

export function openLoaderForm() {
  loader.classList.remove("is-hidden");
  formElements.forEach((element) => element.setAttribute("disabled", ""));
  formButtons.forEach((element) => element.setAttribute("disabled", ""));
  customsSelect.setAttribute("disabled", "true");
  customsSelect.setAttribute("tabindex", "none");
}

export function closeLoaderForm() {
  loader.classList.add("is-hidden");
  formElements.forEach((element) => element.removeAttribute("disabled"));
  formButtons.forEach((element) => element.removeAttribute("disabled"));
  customsSelect.removeAttribute("disabled", "true");
  customsSelect.removeAttribute("tabindex", "none");
}
