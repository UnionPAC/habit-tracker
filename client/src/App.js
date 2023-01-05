import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";

import HabitState from "./context/habit/HabitState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <AuthState>
      <HabitState>
        <AlertState>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <div className="text-white bg-[#1d1d1d]">
                <Alerts />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </HabitState>
    </AuthState>
  );
};

export default App;
