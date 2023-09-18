import Button from "./Button"

const MovieComponent = ({movie,onClick}) => {
  return (
    <li key={movie.imdbID} onClick={() => onClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
const RenderMovies = ({movies,onClick}) => {
  return (
    <ul className="list">
      {movies?.map((movie) => <MovieComponent movie={movie} onClick={onClick}/>)}
    </ul>
  )
}
const MovieError = ({query}) => {
  return (
    <>
       {!query ? <p className="loader">Search for any movie</p> : <p className="loader">NO Results Found</p>}
    </>
  )
}

const MoviesResults = ({ isOpen, setIsOpen, movies, query,onClick}) => {
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {movies.length === 0 && <MovieError query={query}/>}
      {isOpen && <RenderMovies movies={movies}  onClick={onClick}/>}
    </div>
  )
}
export default MoviesResults