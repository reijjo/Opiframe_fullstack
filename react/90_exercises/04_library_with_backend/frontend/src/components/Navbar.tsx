import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <h1>Library</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Book</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
