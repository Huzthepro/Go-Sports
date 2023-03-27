import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//This hook use authContext Context to check if user has valid token
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Pitch from "./pages/Pitch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
//Navbar is above every page
//Logged in user will be navigated to Homepage

function App() {
  const { user } = useAuthContext();
  //AuthContext already control local storage if there is valid Token
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/pitch"
              element={user ? <Pitch /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
