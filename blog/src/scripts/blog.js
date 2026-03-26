import { articlesCount } from "./parts/statistic.js";
import { createArticle } from "./parts/createArtilce.js";
import { addCloseButtonToAllArticles } from "./parts/deleteArticle.js";

const body = document.body;
const stub = document.querySelector(".black-back");
const statisticButton = document.querySelector(".admin-panel__stat");
const modalStatistic = document.querySelector(".dialog");
const spanArticleCount = document.querySelector(".articles-modal__counter");
const closeDialogButton = document.querySelector(".dialog__close");
const addArticleButton = document.querySelector(
  ".create-article__submit-button",
);

statisticButton.addEventListener("click", () => {
  toggleHide();
  spanArticleCount.innerHTML = articlesCount();
});

stub.addEventListener("click", toggleHide);

closeDialogButton.addEventListener("click", toggleHide);

addArticleButton.addEventListener(
  "click",
  createArticle.bind(addArticleButton),
);

function toggleHide() {
  body.classList.toggle("no-scroll");
  stub.classList.toggle("is-hidden");
  modalStatistic.classList.toggle("is-hidden");
}

addCloseButtonToAllArticles();
