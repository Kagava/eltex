import { articlesCount } from "./statistic.js";
import { putItemInLocalStorage } from "./loadArticles.js";

import { Article } from "./article.js";

const imageUrl = "../assets/article-foto.png";

const frontClassName = "frontend-article";
const tennisClassName = "tennis-article";

const form = document.querySelector(".create-article__form");
const articlesContainer = document.querySelector(".articles__container");

export function createArtilceFromLoad(id, type, data, date) {
  const [title, description] = data;
  const [currentDate, currentDateString] = date;
  const tempArticle = new Article(
    id,
    title,
    description,
    imageUrl,
    type,
    currentDate,
    currentDateString,
  );

  articlesContainer.append(tempArticle.getArticle);
}

export function createArticle(target) {
  target.preventDefault();
  const [title, description] = getDataForm();
  console.log(title, description);
  const articleType = chooseType();
  const tempArticle = new Article(
    crypto.randomUUID(),
    title,
    description,
    imageUrl,
    articleType,
    "",
    "",
  );
  console.log(tempArticle);
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
