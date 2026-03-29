const articleCollection = document.querySelectorAll(".article");

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
  targetArticle.remove();
}
