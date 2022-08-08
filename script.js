// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=f3c77e79&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";
//       movies.forEach((movie) => {
//         cards += showCards(movie);
//       });
//       $(".movie-container").html(cards);
//       // When button 'more' is clicked
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=f3c77e79&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = movieDetailMore(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responsetext);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responsetext);
//     },
//   });
// });


// using fetch
// const srcButton = document.querySelector('.search-button');
// srcButton.addEventListener('click', function() {
//   const keyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=f3c77e79&s=' + keyword.value)
//     .then(response => response.json())
//     .then(response => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach(m => cards += showCards(m));
//       const content = document.querySelector('.movie-container');
//       content.innerHTML = cards;

//       // More is clicked
//       const modalDetailButton= document.querySelectorAll('.modal-detail-button');
//       modalDetailButton.forEach(btn => {
//         btn.addEventListener('click', function() {
//           const imdbid = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=f3c77e79&i=' + imdbid)
//             .then(response => response.json())
//             .then(m => {
//               const movieDetail = movieDetailMore(m);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             })
//         })
//       });
//     })
// })


// Make our code more readable
const srcButton  = document.querySelector('.search-button');
srcButton.addEventListener('click', async function() {
  const inputKeyword = document.querySelector('.input-keyword');
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

document.addEventListener('click', async function(e) {
  if(e.target.classList.contains('modal-detail-button')) {
    const movieID = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(movieID);
    updateDetailUI(movieDetail);
  };
})

function updateDetailUI(m) {
  const movieDetail = movieDetailMore(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}

function getMovieDetail (movieID) {
  return fetch('http://www.omdbapi.com/?apikey=f3c77e79&i=' + movieID)
    .then(response => response.json())
    .then(response => response);
}

function getMovies(keyword){
  return fetch('http://www.omdbapi.com/?apikey=f3c77e79&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(movies) {
  const cardContainer = document.querySelector('.movie-container')
  let cards = '';
  movies.forEach(m => cards += showCards(m));
  cardContainer.innerHTML = cards;
}

function showCards(m) {
  return `<div class="col-md-4">
      <div class="card">
        <img class="card-img-top" src="${m.Poster}" />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">More</a>
        </div>
      </div>
    </div>`;
}

function movieDetailMore(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item">${m.Title} (${m.Year})</li>
        <li class="list-group-item">Director: ${m.Director} </li>
        <li class="list-group-item">Actors: ${m.Actors}</li>
        <li class="list-group-item">Writer: ${m.Writer}</li>
        <li class="list-group-item">Plot: ${m.Plot} </li>
      </ul>
    </div>
  </div>
</div>`;
}
