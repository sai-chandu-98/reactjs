import MovieList from "./MovieList";
import useFetch from './useFetch';

const Home = () => {
  const { movies, isPending, error } = useFetch('http://localhost:3500/movies');
  
  console.log(movies); 

  return (
    <div className="home">
      <h1>All Movies!</h1>
      {error && <div>{error}</div>}
      {isPending && <div>loading....!</div>}
      {movies && <MovieList movies={movies} title="All Movies" />}
    </div>
  );
};

export default Home;
