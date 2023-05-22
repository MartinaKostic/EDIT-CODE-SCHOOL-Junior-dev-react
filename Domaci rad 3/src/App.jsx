import "./App.css";
import { createContext, useState } from "react";
import Kontakt from "./components/Kontakt";
import Adresa from "./components/Adresa";
import Nacinplacanja from "./components/Nacinplacanja";
import Uvjeti from "./components/Uvjeti";
import Sazetak from "./components/Sazetak";

export const KontaktContext = createContext();
export const AdresaContext = createContext();

function App() {
  const [kontakt, postaviKontakt] = useState("");
  const [ime, postaviIme] = useState("");
  const [adresa, postaviAdresu] = useState("");
  const [drzava, postaviDrzavu] = useState("");
  const [placanje, postaviPlacanje] = useState("");
  const [oznaceno, postaviOznaceno] = useState(false);
  const [prikaz, postaviPrikaz] = useState(false);
  const postaviNacinPlacanja = (e) => {
    postaviPlacanje(e.target.value);
  };
  const postaviPrihvacanjeUvjeta = (e) => {
    postaviOznaceno(e.target.value);
  };
  function provjera() {
    let provjereno = true;
    if (
      kontakt.length == 0 ||
      !kontakt.includes("@") ||
      ime.length == 0 ||
      adresa.length == 0 ||
      drzava.length == 0 ||
      placanje == "" ||
      !oznaceno
    )
      provjereno = false;
    else provjereno = true;
    return provjereno;
  }
  function Narudzba() {
    if (provjera()) {
      postaviPrikaz(true);
    } else {
      alert(
        "Ups... Izgleda da je nešto pošlo po zlu. Provjerite da su sva polja popunjena!"
      );
    }
  }
  return (
    <div className="main">
      <h2>Plaćanje</h2>
      <div className="container">
        <KontaktContext.Provider value={{ kontakt, postaviKontakt }}>
          <Kontakt />
        </KontaktContext.Provider>
      </div>
      <div className="container">
        <AdresaContext.Provider
          value={{
            ime,
            postaviIme,
            adresa,
            postaviAdresu,
            drzava,
            postaviDrzavu,
          }}
        >
          <Adresa />
        </AdresaContext.Provider>
      </div>
      <div className="container">
        <Nacinplacanja
          placanje={placanje}
          postaviRadio={() => postaviNacinPlacanja}
        />
      </div>
      <div className="center">
        <Uvjeti
          oznaceno={oznaceno}
          postaviCheck={() => postaviPrihvacanjeUvjeta}
        />
      </div>
      <div className="center">
        <button onClick={Narudzba}>Naruči</button>
      </div>
      <div>
        {prikaz && (
          <Sazetak
            kontakt={kontakt}
            ime={ime}
            adresa={adresa}
            drzava={drzava}
            placanje={placanje}
          ></Sazetak>
        )}
      </div>
    </div>
  );
}
export default App;
