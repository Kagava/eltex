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

const form = document.querySelector(".create-article__form");
const articlesContainer = document.querySelector(".articles__container");
const article = document.querySelector(
  ".articles__article.article_small.article",
);

export function createArticle(target) {
  target.preventDefault();
  //Получить данные с формы
  clearForm();
  const newArticle = article.cloneNode(true);
  addContent(newArticle);
  addDate(newArticle);
  articlesContainer.append(newArticle);
  console.log(`${dateTimeElement}`);
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

function addContent(article) {
  const header = article.querySelector(".article__article-header");
  header.innerHTML = "MOCK-header";
  const information = article.querySelector(".article__information");
  information.innerHTML = "MOCK-information";
}

function clearForm() {
  const header = form.querySelector(".create-article__input-header");
  const text = form.querySelector(".create-article__input-information");
  header.value = "";
  text.value = "";
}
