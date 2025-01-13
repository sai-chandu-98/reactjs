import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('sai');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const movie = { title, body, author };

    // Send POST request to add the new movie
    fetch('http://localhost:3500/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    })
    .then(res => res.json())
    .then(() => {
      navigate('/'); // Redirect to home or movies list after submission
    })
    .catch(error => console.error('Error adding movie:', error)); // Handle error
  }

  return (
    <div className="create">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Movie Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Movie Body</label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <label>Movie Author</label>
        <select value={author} onChange={e => setAuthor(e.target.value)}>
          <option value="sai">sai</option>
          <option value="chandu">chandu</option>
        </select>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default Create;
