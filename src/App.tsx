import React, { useState } from "react";
import "./main.css";
import pokepic from "./assets/pokeball.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import Link
import Login from "./auth/Login";
import Register from "./auth/Register";
import PokemonContainer from "./pokemon/PokemonContainer";
import { getAuth } from "firebase/auth";

function App() {
  const initialPokemons = [
    {
      id: 1,
      name: "bobo",
      types: ["yer"],
      url: "http://",
      abilities: ["smash"],
      image: "wewesd",
    },
  ];

  const auth = getAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const HomePage = () => (
    <div>
      <div className="top-container">
        <img src={pokepic} alt="nopic" />
        <h1 className="main-logo-text">Pokedex App</h1>
      </div>
      <PokemonContainer initialPokemons={initialPokemons} />
    </div>
  );

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login auth={auth} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={
              <Register
                auth={auth}
                setIsRegistered={setIsRegistered}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              isRegistered ? (
                isLoggedIn ? (
                  <HomePage />
                ) : (
                  <Login auth={auth} setIsLoggedIn={setIsLoggedIn} />
                )
              ) : (
                <Register
                  auth={auth}
                  setIsRegistered={setIsRegistered}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
