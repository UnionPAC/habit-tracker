import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-blue-800 h-[10vh] px-20">
      <div className=" flex justify-center items-center">
        <Link to="/">
          <span className="text-3xl font-semibold text-white tracking-wide">
            habit tracker
          </span>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex space-x-12 text-white">
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Habit Tracker",
};

export default Navbar;
