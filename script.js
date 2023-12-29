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
  container.innerHTML = data.results
    .map(
      ({ id, backdrop_path, original_title, vote_average }) => `
  <div class="poster-banner" ondblclick="moviedetails(${id})">
      <img src="${image_url + backdrop_path}" alt ="${original_title}">
      <div class = "movie-info">
          <h3>${original_title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
  </div>`
    )
    .join("");
};

const searchmovies = async (name) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&query=${name}`
  );
  const data = await response.json();
  container.innerHTML = data.results
    .map(
      ({ id, backdrop_path, original_title, vote_average }) => `
    <div class="poster-banner" ondblclick="moviedetails(${id})">
        <img src="${image_url + backdrop_path}" alt ="${original_title}">
        <div class="movie-info">
            <h3>${original_title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    </div>`
    )
    .join("");
};

const moviedetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d6d60f5f0e645febd6593c7c8b0e2c38&language=en-US&page=1`
  );

  const similarmovies = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1`
  );
  const similarmov = await similarmovies.json();
  const data = await response.json();
  const similarMoviesHTML = similarmov.results
    .map(
      ({ id, backdrop_path, original_title, vote_average }) => `
    <div class="poster-banner" onclick="moviedetails(${id})">
        <img src="${image_url + backdrop_path}" alt="${original_title}">
        <div class="movie-info">
            <h3>${original_title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    </div>`
    )
    .join("");

  container.innerHTML = `
  <div class="con">
    <div class="details-container">
        <img src="${image_url + data.backdrop_path}" alt="Movie Poster"></img>
        <h1><span>Title:</span> ${data.original_title}</h1>
        <h1><span>Genres: </span>${data.genres.map((data) => data.name)}</h1>
        <p>${data.overview}</p>
        <div class="simmov">
          <h1><span>Similar Movies:</span></h1>
          <div class="similar-movies">${similarMoviesHTML}</div>
        </div>
    </div>

  </div>`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchform = search.value;
  searchmovies(searchform);
});

showMovies();
