import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from './useFetch';

const MovieDetails = () => {
    const { id } = useParams();
    const { movies, isPending, error } = useFetch('http://localhost:3500/movies/' + id);
    const navigate = useNavigate();

    // State to handle edit mode and input values
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (movies) {
            setTitle(movies.title);
            setAuthor(movies.author);
            setBody(movies.body);
        }
    }, [movies]);

    const handleDelete = () => {
        fetch('http://localhost:3500/movies/' + id, {
            method: 'DELETE',
        })
        .then(() => {
            navigate('/'); // Redirect to the home page
        })
        .catch((err) => console.error("Failed to delete movie:", err));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedMovie = { ...movies, title, author, body };
        fetch('http://localhost:3500/movies/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie)
        })
        .then(() => {
            setIsEditing(false);
        })
        .catch((err) => console.error("Failed to update movie:", err));
    };

    return (
        <div className="movie-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {movies && (
                <article>
                    {!isEditing ? (
                        <>
                            <h2>{movies.title}</h2>
                            <p>Written by {movies.author}</p>
                            <div>{movies.body}</div>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <label>Title:</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />

                            <label>Author:</label>
                            <input 
                                type="text" 
                                value={author} 
                                onChange={(e) => setAuthor(e.target.value)} 
                            />

                            <label>Description:</label>
                            <textarea 
                                value={body} 
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    )}
                </article>
            )}
        </div>
    );
};

export default MovieDetails;
