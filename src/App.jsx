import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Verify from "./components/Auth/Verify";
import ForgotPassword from "./components/Auth/ForgotPassword";
import { useAuth } from "./context/AuthContext";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import AddTask from "./components/Tasks/AddTask";
import UpdateTask from "./components/Tasks/UpdateTask";
import TaskList from "./components/Tasks/TaskList";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const { token, resetToken } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/forgot-password"
          element={resetToken ? <ForgotPassword /> : <Navigate to="/verify" />}
        />
        <Route
          path="/"
          element={token ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route path="/" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update-task" element={<UpdateTask />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
