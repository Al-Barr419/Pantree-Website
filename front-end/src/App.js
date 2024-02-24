import "./App.css";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
