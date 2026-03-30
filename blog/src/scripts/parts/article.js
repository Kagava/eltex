import { addCloseButton } from "./deleteArticle.js";

export class Article {
  _article = document
    .querySelector(".template-article")
    .content.querySelector(".article")
    .cloneNode(true);

  constructor(
    id,
    title,
    description,
    imageUrl,
    category,
    date = "",
    dateString = "",
  ) {
    this._id = id;
    this._title = title;
    this._date = date;
    this._dateString = dateString;
    this._description = description;
    this._imageUrl = imageUrl;
    this._category = category;
    this._classList = `article__content ${this.category}`;
    this.#findData();
    this.#setData();
    this.#addContent();
    this.#setClassList();
    addCloseButton(this._article);
  }

  #addContent() {
    this._article.querySelector(".article__article-header").innerHTML =
      `${this._title}`;
    this._article.querySelector(".article__information").innerHTML =
      `${this._description}`;
  }

  #setData() {
    function createDate(dateTime, dateString) {
      const time = document.createElement("time");
      time.dateTime = dateTime;
      time.textContent = dateString;
      return time;
    }

    const dateTimeElement = createDate(this._date, this._dateString);
    const timeParagraph = this._article.querySelector(".article__date");
    timeParagraph.replaceChildren(dateTimeElement);
  }

  #findData() {
    if (this._date !== "") {
      return;
    }
    const justDate = new Date();
    const currentDate = justDate.getDate();
    const currentMonth = findMonth(justDate.getMonth());
    const currentYear = justDate.getFullYear();
    this._date = `${currentYear}-${(justDate.getMonth() + 1).toString().padStart(2, 0)}-${currentDate.toString().padStart(2, 0)}`;
    this._dateString = `${currentDate} ${currentMonth} ${currentYear}`;
  }

  #setClassList() {
    this._article.querySelector(".article__content").classList =
      `article__content ${this._category}`;
  }

  prepareArtilceInLoaclStorage() {
    return {
      id: this._id,
      title: this._title,
      date: this._date,
      dateFormatted: this._dateString,
      description: this._description,
      image: this._imageUrl,
      category: this._category,
    };
  }

  get getArticle() {
    return this._article;
  }
}

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

function findMonth(monthNumber) {
  return monthArray[monthNumber];
}
