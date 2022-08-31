import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import NavBar from "./Components/NavBar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import AddNewBook from "./Pages/AddNewBook";
import Footer from "./Components/Footer";
import ManageBooks from "./Pages/ManageBooks";
import Edit from "./Pages/Edit";
import Profile from "./Pages/Profile";

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") setLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route path="/register" element={<Register loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
        <Route path="/addnew" element={<AddNewBook loggedIn={loggedIn} />} />
        <Route
          path="/managebooks"
          element={<ManageBooks loggedIn={loggedIn} />}
        />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
