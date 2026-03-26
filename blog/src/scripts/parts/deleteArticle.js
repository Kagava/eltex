const articleCollection = document.querySelectorAll(".article");

export function addCloseButtonToAllArticles() {
  articleCollection.forEach((item) => {
    addCloseButton(item);
  });
}

function addCloseButton(article) {
  const closeButton = createCloseButton();
  article.append(closeButton);
}

function createCloseButton() {
  const closeButton = document.createElement("div");
  closeButton.className = "close-button article__close";
  return closeButton;
}
