import React, { useState } from "react";
import "./main.css";
import pokepic from "./assets/pokeball.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PokemonContainer from "./pokemon/PokemonContainer";
import { getAuth, signOut } from "firebase/auth";

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
  const [user, setUser] = useState("");

  const HomePage = () => (
    <div>
      <PokemonContainer initialPokemons={initialPokemons} user={user} />
    </div>
  );

  const Navigation = () => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        setUser("");
        console.log(user, "has been logged out");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    return (
      <div className="top-container">
        <img src={pokepic} alt="nopic" />
        <h1 className="main-logo-text">Pokedex App</h1>
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={handleLogout}>
                <Link to="/login">Logout</Link>
              </li>
            )}
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  const LoginComponent = (
    <Login
      auth={auth}
      setIsLoggedIn={setIsLoggedIn}
      setIsRegistered={setIsRegistered}
      setUser={setUser}
    />
  );

  const RegisterComponent = (
    <Register
      auth={auth}
      setIsLoggedIn={setIsLoggedIn}
      setIsRegistered={setIsRegistered}
      setUser={setUser}
    />
  );

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={LoginComponent} />
          <Route path="/register" element={RegisterComponent} />
          <Route
            path="/"
            element={
              isRegistered ? (
                isLoggedIn ? (
                  <HomePage />
                ) : (
                  LoginComponent
                )
              ) : (
                RegisterComponent
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
