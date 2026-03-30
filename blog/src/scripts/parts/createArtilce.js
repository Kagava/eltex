import { articlesCount } from "./statistic.js";
import { addCloseButton } from "./deleteArticle.js";
import { putItemInLocalStorage } from "./loadArticles.js";

import { Article } from "./article.js";

const monthArray = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const imageUrl = "../assets/article-foto.png";

const frontClassName = "frontend-article";
const tennisClassName = "tennis-article";

const form = document.querySelector(".create-article__form");
const articlesContainer = document.querySelector(".articles__container");
const article = document.querySelector(".template-article");

export function createArtilceFromLoad(id, type, data, date) {
  const newArticle = article.content.querySelector(".article").cloneNode(true);
  newArticle.id = `article-${id}`;
  newArticle.querySelector(".article__content").classList =
    `article__content ${type}`;
  addContent(newArticle, data);
  const dateString = `Опубликовано: ${date[1]}`;
  const dateTimeElement = createDate(date[0], dateString);
  const timeParagraph = newArticle.querySelector(".article__date");
  timeParagraph.replaceChildren(dateTimeElement);
  addCloseButton(newArticle);
  articlesContainer.append(newArticle);
}

export function createArticle(target) {
  const [title, description] = getDataForm();
  const articleType = chooseType();
  const tempArticle = new Article(
    articlesCount(),
    title,
    description,
    imageUrl,
    articleType,
  );
  articlesContainer.prepend(tempArticle.getArticle);

  const articleToLocalStorage = tempArticle.prepareArtilceInLoaclStorage();
  putItemInLocalStorage(articleToLocalStorage);
}

function getDataForm() {
  const header = form.querySelector(".create-article__input-header");
  const text = form.querySelector(".create-article__input-information");
  const headerValue = header.value;
  header.value = "";
  const textValue = text.value;
  text.value = "";
  return [headerValue, textValue];
}

function chooseType() {
  const inputType = form.querySelector(".create-article__input-type");
  return inputType.value === "tennis" ? tennisClassName : frontClassName;
}

// TODO:

/*
  Добавить валидацию формы
*/
