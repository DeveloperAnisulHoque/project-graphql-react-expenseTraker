import { useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { SIGN_UP } from "./graphql/mutations/user.mutation";
import { toast } from "react-hot-toast";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  const { data } = useQuery(GET_AUTHENTICATED_USER);

  return (
    <div className="bg-indigo-400 h-screen w-screen text-white p-10 font-semibold">
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!data?.authUser ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
