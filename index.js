const API_KEY = "e61d45eecb56451c9562529cdffef974";
const url = "https://newsapi.org/v2/everything?q=";
const startDate = "2023-08-09";
const toDate = "2023-07-20";
window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(
    `${url}${query}&from=${startDate}&to=${toDate}&sortBy=publishedAt&apikey=${API_KEY}`
  );
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsDesc = cardClone.querySelector("#news-desc");
  const newsSource = cardClone.querySelector("#news-source");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  newsSource.innerHTML = `${article.source.name} ∙ ${formattedDate}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const SearchButton = document.getElementById("search-button");
const SearchText = document.getElementById("search-text");
SearchButton.addEventListener("click", () => {
  const query = SearchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
