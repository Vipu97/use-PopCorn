import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Details = ({ movie,selectedID ,setDetailsOpen, watched, setWatched }) => {
  const [ratings, setRatings] = useState();
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const handleOnChange = (e) => {
    setRatings(e.target.value);
  };
  const addToList = (movie) => {
    movie.userRating = ratings;
    const newList = [...watched, movie];
    setWatched(newList);
    setDetailsOpen(false);
  };

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => setDetailsOpen(false)}>
          &larr;
        </button>
        <img src={movie.Poster} alt="movie-poster" />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>⭐ {movie.imdbRating} IMDb Rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          {console.log(movie in watched)}
          {isWatched ? (
            <p>You rated this movie {watchedUserRating}🌟</p>
          ) : (
            <Rating
              style={{ fontSize: "2.5rem" }}
              max={10}
              value={ratings}
              onChange={handleOnChange}
            />
          )}
          {ratings && (
            <button className="btn-add" onClick={() => addToList(movie)}>
              +Add to list
            </button>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring : {movie.Actors}</p>
        <p>Directed by : {movie.Director}</p>
      </section>
    </div>
  );
};

const ShowMovieDetails = ({ selectedID, setDetailsOpen, watched, setWatched}) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    function () {
      const getMovieDetails = async () => {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=63f78090&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      };
      getMovieDetails();
    },
    [selectedID]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Details
          movie={movie}
          setDetailsOpen={setDetailsOpen}
          selectedID={selectedID}
          watched={watched}
          setWatched={setWatched}
        />
      )}
    </>
  );
};
export default ShowMovieDetails;
