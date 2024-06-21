import { Link } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import "../Navbar/Navbar.scss";

const Navbar = ({
  searchQuery,
  handleInput,
  handleKeyDown,
  mode,
  toggleMode,
}) => {
  return (
    <div className={`navbar ${mode === false ? "light-mode" : "dark-mode"}`}>
      <Link to="/">Home</Link>
      <Link to="/genres">Genres</Link>
      <Link to="/developers">Developers</Link>
      <Link to="/publishers">Publishers</Link>
      <Link to="/platforms">Platforms</Link>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Search games..."
      />
      <button onClick={toggleMode}>
        {mode === false ? (
          <FiSun className="icon" />
        ) : (
          <IoMoonOutline className="icon" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
