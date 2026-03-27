import { articlesCount } from "./statistic.js";

const articleCollection = document.querySelectorAll(".article");
const templateArticle = document.querySelector(".template-article");

export function addCloseButtonToAllArticles() {
  articleCollection.forEach((item) => {
    addCloseButton(item);
  });
}

export function addCloseButton(article) {
  const closeButton = createCloseButton();
  article.append(closeButton);
}

function createCloseButton() {
  const closeButton = document.createElement("div");
  closeButton.className = "close-button article__close";
  closeButton.addEventListener("click", closeArticle.bind(closeButton));
  return closeButton;
}

function closeArticle(event) {
  const target = event.target;
  const targetArticle = target.closest(".article");
  if (targetArticle.classList.contains("article-main")) {
    targetArticle.remove();
    if (articlesCount() !== 0) makeNewMain();
  } else {
    targetArticle.remove();
  }
}

function makeNewMain() {
  const firstArtilce = document.querySelector(".article");
  firstArtilce.classList.remove("article_small");
  firstArtilce.classList.add("article-main");
  const fotoArticle = firstArtilce.querySelector(".article__foto");
  fotoArticle.classList.add("foto-main");
  const textArticle = Array.from(
    firstArtilce.querySelector(".article__text").children,
  );
  textArticle.forEach((item) => {
    item.classList.value = item.classList.value.replace(/\w+_closed/, "");
  });
}
