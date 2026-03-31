import { fetchJson } from "./loadJson.js";
import { createArtilceFromLoad } from "./createArtilce.js";

const urlArticlesFile = "./src/scripts/data/articles.json";

export async function loadArticles() {
  const regex = /^article-/;
  const localStorageKeys = Object.keys(localStorage).filter((item) =>
    regex.test(item),
  );
  if (localStorageKeys.length) {
    const articles = [];
    for (let key of localStorageKeys) {
      const article = JSON.parse(localStorage.getItem(key));
      articles.push(article);
    }
    await articlesJob(articles);
  } else {
    const promise = fetchJson(urlArticlesFile);
    promise
      .then(async (data) => {
        const articles = data.articles;
        await articlesJob(articles);
      })
      .catch((err) => {
        console.log(err, "THERE IS SOMETING WRONG");
      });
  }

  return true;
}

async function articlesJob(articles) {
  const sortedArticles = sortArticles(articles);
  await createAritcles(sortedArticles);
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
    await delay(500);
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

export async function putItemInLocalStorage(item) {
  localStorage.setItem(`article-${item.id}`, JSON.stringify(item));
  await delay(5000);
}
