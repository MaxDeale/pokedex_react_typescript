import React, { useState } from "react";
import "./main.css";
import pokepic from "./assets/pokeball.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
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
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        setUser("");
        navigate("/login");
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
            <li>
              <Link to="/login">Login</Link>
            </li>
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
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

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                auth={auth}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                auth={auth}
                setIsRegistered={setIsRegistered}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
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
                  <Login
                    auth={auth}
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                  />
                )
              ) : (
                <Register
                  auth={auth}
                  setIsRegistered={setIsRegistered}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
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
