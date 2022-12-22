import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import HabitState from "./context/habit/HabitState";

// bg color = bg-[#1d1d1d]

const App = () => {
  return (
    <HabitState>
      <Router>
        <Fragment>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element="" />
              <Route path="/login" element="" />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </HabitState>
  );
};

export default App;
