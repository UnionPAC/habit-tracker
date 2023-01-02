import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import HabitState from "./context/habit/HabitState";

const App = () => {
  return (
    <HabitState>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <div className="text-white bg-[#1d1d1d]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element="" />
              <Route path="/login" element="" />
            </Routes>
          </div>
        </div>
      </Router>
    </HabitState>
  );
};

export default App;
