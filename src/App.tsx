import "./main.css";
import pokepic from "./assets/pokeball.png";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./auth/Login";
import Register from "./auth/Register";
import PokemonContainer from "./pokemon/PokemonContainer";

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

  const HomePage = () => (
    <div>
      <div className="top-container">
        <img src={pokepic} alt="nopic" />
        <h1 className="main-logo-text">Pokedex App</h1>
      </div>
      <PokemonContainer initialPokemons={initialPokemons} />
    </div>
  );

  let isLoggedIn = false;

  const AuthSection = () => {
    return !isLoggedIn ? (
      <div style={{ margin: "0 auto" }}>
        <Register />
      </div>
    ) : (
      <div>
        <Login />
      </div>
    );
  };

  return (
    <div className="App">
      <AuthSection />
      <HomePage />
    </div>
  );

  // return (
  //   <div className="App">
  //        <Router>
  //     <div>
  //       <Switch>
  //         <Route path="/login" component={Login} />
  //         <Route path="/register" component={Register} />
  //         <Route path="/home" component={HomePage} />
  //       </Switch>
  //     </div>
  //   </Router>
  //   </div>
  // );
}

export default App;
