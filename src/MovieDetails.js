import { useNavigate, useParams } from "react-router-dom";
import useFetch from './useFetch';

const MovieDetails = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const { movies, isPending, error } = useFetch('http://localhost:3500/movies/' + id);
    const navigate = useNavigate(); // Get navigate function

    const handleClick = () => {
        fetch('http://localhost:3500/movies/' + movies.id, {
            method: 'DELETE',
        })
        .then(() => {
            // Once the movie is deleted, navigate back to the home page
            navigate('/');
        })
    };

    return (
        <div className="movie-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {movies && (
                <article>
                    <h2>{movies.title}</h2>
                    <p>Written by {movies.author}</p>
                    <div>{movies.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
};

export default MovieDetails;
