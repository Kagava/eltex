const articleCollection = document.querySelectorAll(".article");

export function addCloseButtonToAllArticles() {
  articleCollection.forEach((item) => {
    addCloseButton(item);
  });
}

export function addCloseButton(article) {
  const closeButton = createCloseButton();
  article.append(closeButton);
  article.addEventListener("click", closeArticle);
}

function createCloseButton() {
  const closeButton = document.createElement("div");
  closeButton.className = "close-button article__close";
  return closeButton;
}

function closeArticle(event) {
  const target = event.target;
  if (!target.classList.contains("article__close")) {
    return;
  }
  const targetParent = target.closest(".article");
  const targetParentId = targetParent.id;
  localStorage.removeItem(targetParentId);
  targetParent.remove();
}
