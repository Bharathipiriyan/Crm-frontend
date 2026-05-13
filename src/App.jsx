import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import Leads from "./leads";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/leads"
          element={<Leads />}
        />

      </Routes>

    </BrowserRouter>
  );

}

export default App;