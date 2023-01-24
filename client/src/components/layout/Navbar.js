import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout, useAuth } from "../../context/auth/AuthState";
import { clearHabits, useHabits } from "../../context/habit/HabitState";

const Navbar = () => {
  const [authState, authDispatch] = useAuth();
  const { isAuthed } = authState;

  // habit dispatch w/o state
  const habitDispatch = useHabits()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearHabits(habitDispatch);
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link onClick={onLogout} to="/login">
          logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
      <li>
        <Link to="/signup">signup</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="flex justify-between bg-blue-800 h-[10vh] px-20">
      <div className=" flex justify-center items-center">
        <Link to={isAuthed ? "/" : "/login"}>
          <span className="text-3xl font-semibold text-white tracking-wide">
            habit tracker
          </span>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex space-x-12 text-white tracking-wider">
          {isAuthed ? authLinks : guestLinks}
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
