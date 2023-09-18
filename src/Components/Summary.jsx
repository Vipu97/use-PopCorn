const average = (arr) =>
  arr.reduce((acc, cur, arr) => acc + cur / arr.length, 0);

const roundOff = (num) => {
  const round = Math.round(num * 10) / 10;
  return round;
};
const Summary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{roundOff(avgImdbRating)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{roundOff(avgUserRating)}</span>
        </p>
      </div>
    </div>
  );
};
export default Summary;
