const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const baseurl = "https://api.themoviedb.org/3";
const api =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&language=en-US&page=1";
const image_url = "https://image.tmdb.org/t/p/w500";
const search_url =
  baseurl + "/search/movie?api_key=d6d60f5f0e645febd6593c7c8b0e2c38";

getMovies(api);
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieelement = document.createElement("div");
    movieelement.classList.add("movie");
    movieelement.innerHTML = `
        <img src="${image_url + poster_path}" alt ="${title}">
        <div class"movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>`;

    main.appendChild(movieelement);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchform = search.value;
  if (searchform) {
    getMovies(search_url + "&query=" + searchform);
  }
});
