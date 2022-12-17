import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="bg-[#2C3539]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element="" />
            <Route path="/login" element="" />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
