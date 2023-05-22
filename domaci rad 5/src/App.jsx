import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filter from "./components/Filter";
import Tablica from "./components/Tablica";
import { GiClothes } from "react-icons/gi";
import UnosPodataka from "./components/UnosPodataka";
import OsvjezavanjeContext from "./components/OsvjezavanjeContext";

function App() {
  const [ormar, postaviOrmar] = useState([]);
  const [filtriraniOrmar, postaviFiltriraniOrmar] = useState([]);
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3002/ormar/").then((rez) => {
      postaviOrmar(rez.data);
      postaviFiltriraniOrmar(rez.data);
    });
  }, []);
  useEffect(() => {
    if (filter) {
      const filtriraniOrmar = ormar.filter((o) => o.odjeca.vrsta == filter);
      postaviFiltriraniOrmar(filtriraniOrmar);
    } else {
      postaviFiltriraniOrmar(ormar);
    }
  }, [filter]);
  return (
    <div className="App">
      <h1>
        MOJA GARDEROBA
        <GiClothes />
      </h1>
      <div>
        <Filter dodaj={setFilter}></Filter>
      </div>
      <OsvjezavanjeContext.Provider value={postaviFiltriraniOrmar}>
        <Tablica ormar={filtriraniOrmar}></Tablica>
      </OsvjezavanjeContext.Provider>
      <button
        className="rozi_botun"
        onClick={() => setPrikaziFormu(!prikaziFormu)}
      >
        Dodaj novi komad odjeće!
      </button>
      {prikaziFormu && (
        <UnosPodataka dodaj={postaviFiltriraniOrmar}></UnosPodataka>
      )}
    </div>
  );
}

export default App;
