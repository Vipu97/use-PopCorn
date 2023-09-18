import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import MoviesResults from "./Components/MoviesResults";
import WatchList from "./Components/WatchList";
import Loader from "./Components/Loader";
import ShowMovieDetails from "./Components/ShowMovieDetails";
import Button from "./Components/Button";
import { useLocalStorageState } from "./utils/useLocalStorage";

const key = "63f78090";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isOpenLeft, setIsOpenLeft] = useState(true);
  const [isOpenRight, setIsOpenRight] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedID, setSelectedID] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [watched, setWatched] = useLocalStorageState([], "watched")

  async function fetchMovies() {
    try {
      setIsLoading(true)
      const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=%22${query}%22`)
      const data = await res.json()
      //console.log(data)
      if (data.Response === 'False')
        throw new Error('Movie Not Found!')
      setMovies(data.Search)
    } catch (err) {
      Error(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (query.length < 2)
      setMovies([])
    fetchMovies()
  }, [query])

  const showDetails = (id) => {
    setSelectedID(id);
    setDetailsOpen(true)
  }
  
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watched'))
    console.log(list)
    if(list)
      setWatched(list)
  },[])

  useEffect(() => {
    localStorage.setItem('watched',JSON.stringify(watched))
  },[watched])

  return (
    <>
      <Navbar query={query} onChange={setQuery} movies={movies} />
      <main className="main">
        {/* left part */}
        {isLoading ?
          <Loader /> :
          <MoviesResults isOpen={isOpenLeft} setIsOpen={setIsOpenLeft} movies={movies} query={query} onClick={showDetails} />
        }

        {/* right part */}
        <div className="box">
        <Button isOpen={isOpenRight} setIsOpen={setIsOpenRight} />
          {isOpenRight &&
            <>
              {!detailsOpen ?
                <WatchList
                  isOpen={isOpenRight} setIsOpen={setIsOpenRight}
                  watched={watched} setWatched={setWatched} /> :
                <ShowMovieDetails selectedID={selectedID} 
                  setDetailsOpen={setDetailsOpen} watched={watched} 
                  setWatched={setWatched}/>
              }
            </> 
          }
        </div>

      </main>
    </>

  );
}