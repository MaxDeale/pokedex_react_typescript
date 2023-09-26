import "./main.css";
import pokepic from "./assets/pokeball.png";
import PokemonContainer from "./components/PokemonContainer";

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
  return (
    <div className="App">
      <div className="top-container">
        <img src={pokepic} alt="nopic" />
        <h1 className="main-logo-text">Pokedex App</h1>
      </div>
      <PokemonContainer initialPokemons={initialPokemons} />
    </div>
  );
}

export default App;
