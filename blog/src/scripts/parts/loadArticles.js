import { fetchJson } from "./loadJson.js";
import { createArtilceFromLoad } from "./createArtilce.js";

const urlArticlesFile = "./src/scripts/data/articles.json";

export function loadArticles() {
  const regex = /^article-/;
  const localStorageKeys = Object.keys(localStorage).filter((item) =>
    regex.test(item),
  );
  console.log(localStorageKeys);
  if (localStorageKeys.length !== 0) {
    console.log("TUT YA");
    const articles = [];
    for (let key of localStorageKeys) {
      const article = JSON.parse(localStorage.getItem(key));
      articles.push(article);
    }
    articlesJob(articles);
  } else {
    const promise = fetchJson(urlArticlesFile);
    promise
      .then(async (data) => {
        const articles = data.articles;
        articlesJob(articles);
      })
      .catch((err) => {
        console.log(err, "THERE IS SOMETING WRONG");
      });
  }

  return 0;
}

function articlesJob(articles) {
  const sortedArticles = sortArticles(articles);
  createAritcles(sortedArticles);
  fillLocalStorage(sortedArticles);
}

function sortArticles(articles) {
  const sortedArticles = [...articles];
  sortedArticles.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate - aDate;
  });
  return sortedArticles;
}

async function createAritcles(arrayArticles) {
  for (const item of arrayArticles) {
    createArtilceFromLoad(
      item.id,
      item.category,
      [item.title, item.description],
      [item.date, item.dateFormatted],
    );
    await delay(50);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fillLocalStorage(articles) {
  articles.forEach((item) => {
    putItemInLocalStorage(item);
  });
}

export function putItemInLocalStorage(item) {
  localStorage.setItem(`article-${item.id}`, JSON.stringify(item));
}
