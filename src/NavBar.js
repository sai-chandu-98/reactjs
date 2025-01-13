import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Movies</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          background: '#ff3333',
          borderRadius: '8px' 
        }}>New movie</Link>

      </div>
    </nav>
  );
}
 
export default Navbar;