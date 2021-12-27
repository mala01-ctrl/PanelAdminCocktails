import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cocktails from "./cocktails/cocktails";
import Footer from "./structure/footer";
import Home from "./structure/home";
import Navbar from "./structure/navbar";
import Login from "./users/login";
import Register from "./users/register";
import UsersList from "./users/usersList";

//TODO da rivedere i link nella navbar
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cocktails" element={<Cocktails />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </React.Fragment>
  );
}

export default App;
