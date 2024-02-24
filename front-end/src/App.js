import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fridge from "./pages/Fridge";
import AboutUs from "./pages/AboutUs";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
