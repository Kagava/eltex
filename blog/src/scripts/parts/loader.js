const loader = document.querySelector(".loader");
const curtain = document.querySelector(".black-back");
const adrminPanel = document.querySelector(".admin-panel");
const customsSelect = document.querySelector(".custom-select");

const formFieldSet = document.querySelector(".create-article__fieldset");

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
  formFieldSet.setAttribute("disabled", "");
  customsSelect.setAttribute("disabled", "true");
  customsSelect.setAttribute("tabindex", "none");
}

export function closeLoaderForm() {
  loader.classList.add("is-hidden");
  formFieldSet.removeAttribute("disabled", "");
  customsSelect.removeAttribute("disabled", "true");
  customsSelect.removeAttribute("tabindex", "none");
}
