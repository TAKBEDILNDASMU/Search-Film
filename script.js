$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=f3c77e79&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
      movies.forEach((movie) => {
        cards += showCards(movie);
      });
      $(".movie-container").html(cards);
      // When button 'more' is clicked
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=f3c77e79&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = movieDetailMore(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responsetext);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responsetext);
    },
  });
});

function showCards(movie) {
  return `<div class="col-md-4">
      <div class="card">
        <img class="card-img-top" src="${movie.Poster}" />
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">More</a>
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
