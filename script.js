const form = document.getElementById("form");
const search = document.getElementById("search");
const container = document.getElementById("container");

const baseurl = "https://api.themoviedb.org/3";
const api =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&language=en-US&page=1";
const image_url = "https://image.tmdb.org/t/p/w500";
const search_url =
  baseurl + "/search/movie?api_key=d6d60f5f0e645febd6593c7c8b0e2c38";
const comp_overview = "";

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const showMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&language=en-US&page=1`
  );
  const data = await response.json();
  console.log(data);
  container.innerHTML = data.results.map(
    ({ id, backdrop_path, original_title, vote_average }) => `
  <button class="poster-banner" ondblclick="moviedetails(${id})">
      <img src="${image_url + backdrop_path}" alt ="${original_title}">
      <div class = "movie-info">
          <h3>${original_title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
  </button>`
  );
};

const searchmovies = async (name) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&query=${name}`
  );
  const data = await response.json();
  console.log(data);
  container.innerHTML = data.results.map(
    ({ id, backdrop_path, original_title, vote_average }) => `
    <button class="poster-banner" ondblclick="moviedetails(${id})">
        <img src="${image_url + backdrop_path}" alt ="${original_title}">
        <div class"movie-info">
            <h3>${original_title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    </button>`
  );
};

const moviedetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&language=en-US`
  );
  const data = await response.json();
  console.log(data);
  container.innerHTML = `<div class="con">
  <img src="${image_url + data.backdrop_path}"></img>
  <h1>Title: ${data.original_title}</h1>
  <h1>Genres: <span>${data.genres.map((data) => data.name)}</span></h1>
  <p>${data.overview}</p>
  </div>`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchform = search.value;
  searchmovies(searchform);
});

showMovies();
