import Summary from "./Summary";

const Movie = ({ movie,removeMovie}) => {
  return (
    <li>
      <img src={movie.Poster} alt="movie-poster" />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
        <button className="btn-delete" 
          onClick={() => removeMovie(movie.imdbID)}>X</button>
      </div>
    </li>
  );
};
const WatchList = ({ watched, setWatched, isOpen }) => {
  const removeMovie = (id) => {
    const newList = watched.filter((movie) => movie.imdbID !== id)
    setWatched(newList)
  } 
  return (
    <>
      {isOpen && <Summary watched={watched} />}
      <ul className="list">
        {watched.map((movie) => (
          <Movie movie={movie} removeMovie={removeMovie}/>
        ))}
      </ul>
    </>
  );
};

export default WatchList;
