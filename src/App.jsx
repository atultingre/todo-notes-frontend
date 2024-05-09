import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import ForgotPassword from "./components/ForgotPassword";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, resetToken } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/forgot-password"
          element={resetToken ? <ForgotPassword /> : <Navigate to="/verify" />}
        />
        <Route exact
          path="/"
          element={!token ? <Navigate to="/login" /> : <Outlet />}
        />
      </Routes>
    </Router>
  );
}

export default App;
