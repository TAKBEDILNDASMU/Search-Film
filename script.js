const srcButton  = document.querySelector('.search-button');
srcButton.addEventListener('click', async function() {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch(err) {
   alert(err);
  }
});


document.addEventListener('click', async function(e) {
  try {
    if(e.target.classList.contains('modal-detail-button')) {
      const movieID = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(movieID);
      updateDetailUI(movieDetail);
    } 
  } catch(err) {
      alert(err);
  }
});

function getMovies(keyword){
  return fetch('http://www.omdbapi.com/?apikey=f3c77e79&s=' + keyword)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      if(response.Response === 'False') {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  const cardContainer = document.querySelector('.movie-container')
  let cards = '';
  movies.forEach(m => cards += showCards(m));
  cardContainer.innerHTML = cards;
}

function getMovieDetail(movieID){
  return fetch('http://www.omdbapi.com/?apikey=f3c77e79&i=' + movieID)
    .then(response => {
      if(!response.ok){
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(m => m);
}

function updateDetailUI(m) {
  const movieDetail = movieDetailMore(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
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
