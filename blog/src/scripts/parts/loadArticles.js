import { fetchJson } from "./loadJson.js";
import { createArtilceFromLoad } from "./createArtilce.js";

const urlArticlesFile = "./src/scripts/data/articles.json";

export function loadArticles() {
  const promise = fetchJson(urlArticlesFile);
  promise
    .then(async (data) => {
      const articles = data.articles;
      const sortedArticles = sortArticles(articles);
      createAritcles(sortedArticles);
    })
    .catch((err) => {
      console.log(err, "THERE IS SOMETING WRONG");
    });
  return 0;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sortArticles(articles) {
  const sortedArticles = [...articles];
  sortedArticles.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate - bDate;
  });
  return sortedArticles;
}

async function createAritcles(arrayArticles) {
  for (const item of arrayArticles) {
    createArtilceFromLoad(
      item.category,
      [item.title, item.description],
      [item.date, item.dateFormatted],
    );
    await delay(50);
  }
}
