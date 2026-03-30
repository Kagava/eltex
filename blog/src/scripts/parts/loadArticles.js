import { fetchJson } from "./loadJson.js";
import { createArtilceFromLoad } from "./createArtilce.js";

const urlArticlesFile = "./src/scripts/data/articles.json";

export function loadArticles() {
  const promise = fetchJson(urlArticlesFile);
  promise
    .then(async (data) => {
      const articles = data.articles;
      articles.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate - bDate;
      });
      for (const item of articles) {
        createArtilceFromLoad(
          item.category,
          [item.title, item.description],
          [item.date, item.dateFormatted],
        );
        await delay(0);
      }
    })
    .catch((err) => {
      console.log(err, "THERE IS SOMETING WRONG");
    });
  return 0;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
