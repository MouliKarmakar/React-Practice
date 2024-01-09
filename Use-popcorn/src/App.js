import { useEffect, useState } from "react";
import StarRating from "./Components/Star-rating";
/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/
// const apiUrl = `https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`;

const KEY = "94fe3132";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("interstellar");
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectId) => (selectId === id ? null : id));
  };
  const handleclose = () => {
    setSelectedId(null);
  };
  const addToWatchList = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDelete = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  };

  // --------------useEffect using Promise--------
  /*
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.Search);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
*/

  // -------------- useEffect using async-await---------

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Somthing went wrong with the data fetching");
          }
          const data = await res.json();

          if (data.Response === false) {
            throw new Error("Movie Not found");
          }
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovie();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <ListBox
          movies={movies}
          isLoading={isLoading}
          error={error}
          onSelect={handleSelectMovie}
        />
        <WatchedBox
          watched={watched}
          selectedId={selectedId}
          onClose={handleclose}
          addToWatchList={addToWatchList}
          handleDelete={handleDelete}
        />
      </Main>
    </>
  );
}

// ---------COMPONENTS---------

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ListBox({ movies, isLoading, error, onSelect }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <>
      {isLoading && <p className="loader">Loading...</p>}

      {error && <p className="error">👎{error}</p>}

      {!isLoading && !error && (
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "-" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list list-movies">
              {movies &&
                movies.map((movie) => (
                  <>
                    <li
                      key={movie.imdbID}
                      onClick={() => onSelect(movie.imdbID)}
                    >
                      <img src={movie.Poster} alt={`${movie.Title} poster`} />
                      <h3>{movie.Title}</h3>
                      <div>
                        <p>
                          <span>🗓</span>
                          <span>{movie.Year}</span>
                        </p>
                      </div>
                    </li>
                  </>
                ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

function WatchedBox({
  watched,
  selectedId,
  onClose,
  addToWatchList,
  handleDelete,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {selectedId ? (
        <SelectedMovie
          movieId={selectedId}
          onClose={onClose}
          addToWatchList={addToWatchList}
          watched={watched}
        />
      ) : (
        isOpen2 && (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{Number(avgRuntime).toFixed(2)} min</span>
                </p>
              </div>
            </div>

            <ul className="list list-watched">
              {watched.map((movie) => (
                <>
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
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
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(movie.imdbID)}
                    >
                      ❎
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}

function SelectedMovie({ movieId, onClose, addToWatchList, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    imdbRating,
    imdbID,
    Released: released,
    Runtime: runtime,
    Language: language,
  } = movieDetails;

  const halndleAdding = () => {
    const newWatchedMovie = {
      poster,
      title,
      imdbID,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    addToWatchList(newWatchedMovie);
    onClose();
  };

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const givenRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  useEffect(() => {
    setLoading(true);
    async function getMovieDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
      );
      const data = await res.json();
      setMovieDetails(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onClose}>
              🔙
            </button>
            <img src={poster} alt={`${title} movie poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}...{runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You have rated this movie with {givenRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating maxRate={10} onSetRating={setUserRating} />
                  {userRating !== 0 && (
                    <button className="btn-add" onClick={halndleAdding}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <h3>Language:-{language}</h3>
            <p>{genre}</p>
            <p>Director:-{director}</p>
            <p>
              <em>{plot}</em>
            </p>
            <p>Artists:-{actors}</p>
          </section>
        </div>
      )}
    </div>
  );
}
