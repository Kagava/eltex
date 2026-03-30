import { articlesCount } from "./statistic.js";
import { addCloseButton } from "./deleteArticle.js";

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

const frontClassName = "frontend-article";
const tennisClassName = "tennis-article";

const form = document.querySelector(".create-article__form");
const articlesContainer = document.querySelector(".articles__container");
const article = document.querySelector(".template-article");

export function createArtilceFromLoad(type, data, date) {
  const newArticle = article.content.querySelector(".article").cloneNode(true);
  newArticle.querySelector(".article__content").classList =
    `article__content ${type}`;
  addContent(newArticle, data);
  const dateString = `Опубликовано: ${date[1]}`;
  const dateTimeElement = createDate(date[0], dateString);
  const timeParagraph = article.content.querySelector(".article__date");
  timeParagraph.replaceChildren(dateTimeElement);
  addCloseButton(newArticle);
  articlesContainer.append(newArticle);
}

export function createArticle(target) {
  target.preventDefault();
  const articleType = chooseType();
  const dataForm = getDataForm();
  const newArticle = article.content.querySelector(".article").cloneNode(true);
  newArticle.querySelector(".article__content").classList =
    `article__content ${articleType}`;
  addContent(newArticle, dataForm);
  addDate(newArticle);
  addCloseButton(newArticle);
  articlesContainer.append(newArticle);
}

function findMonth(monthNumber) {
  return monthArray[monthNumber];
}

function createDate(dateTime, dateString) {
  const time = document.createElement("time");
  time.dateTime = dateTime;
  time.textContent = dateString;
  return time;
}

function addDate(article) {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = findMonth(date.getMonth());
  const currentYear = date.getFullYear();
  const dateTime = `${currentYear}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${currentDate.toString().padStart(2, 0)}`;
  const dateString = `Опубликовано: ${currentDate} ${currentMonth} ${currentYear}`;
  const dateTimeElement = createDate(dateTime, dateString);
  const timeParagraph = article.querySelector(".article__date");
  timeParagraph.replaceChildren(dateTimeElement);
}

function addContent(article, content) {
  article.querySelector(".article__article-header").innerHTML = `${content[0]}`;
  article.querySelector(".article__information").innerHTML = `${content[1]}`;
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
