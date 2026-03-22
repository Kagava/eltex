import { articlesCount } from "./parts/statistic.js";

const body = document.body;
const stub = document.querySelector(".black-back");
const statisticButton = document.querySelector(".admin-panel__stat");
const modalStatistic = document.querySelector(".dialog");
const spanArticleCount = document.querySelector(".articles-modal__counter");

statisticButton.addEventListener("click", () => {
  toggleHide();
  spanArticleCount.innerHTML = articlesCount();
});

stub.addEventListener("click", toggleHide);

function toggleHide() {
  body.classList.toggle("no-scroll");
  stub.classList.toggle("is-hidden");
  modalStatistic.classList.toggle("is-hidden");
}
