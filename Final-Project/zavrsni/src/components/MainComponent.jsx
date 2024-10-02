import { useContext, useState, useEffect } from "react";
import axios from "axios";
import ModeContext from "./ModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs/AboutUs";
import Popis from "./Popis/Popis";
import Obavijesti from "./Obavijesti/Obavijesti";
import Unos from "./Unos/Unos";
import Donacije from "./Donacije/Donacije";
import Navbar from "./Navbar/Navbar";
import Filter from "./Filter/Filter";

function MainComponent() {
  const [animals, setAnimals] = useState([]);

  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [udomljenFilter, setUdomljenFilter] = useState(null);
  const [vrstaFilter, setVrstaFilter] = useState("");
  const [mode, setMode] = useState("korisnik");

  //dohvati sve zivotinje
  useEffect(() => {
    refetchAnimals();
  }, []);

  function refetchAnimals() {
    axios.get("http://localhost:3003/zivotinje").then((res) => {
      setAnimals(res.data);
      setFilteredAnimals(res.data);
    });
    resetFilters();
  }

  //filtriranje:
  useEffect(() => {
    if ((udomljenFilter || udomljenFilter === false) && vrstaFilter) {
      let filteredAnimals = animals.filter(
        (animal) => animal.vrsta == vrstaFilter
      );

      filteredAnimals = filteredAnimals.filter(
        (animal) => animal.udomljen == udomljenFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }

    if (udomljenFilter || udomljenFilter === false) {
      const filteredAnimals = animals.filter(
        (animal) => animal.udomljen === udomljenFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }

    if (vrstaFilter) {
      const filteredAnimals = animals.filter(
        (animal) => animal.vrsta == vrstaFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }
    setFilteredAnimals(animals);
  }, [udomljenFilter, vrstaFilter]);

  function changeContext() {
    setMode(mode == "korisnik" ? "admin" : "korisnik");
  }

  function addAnimal(animal) {
    setAnimals((state) => [...state, animal]);
    setFilteredAnimals((state) => [...state, animal]);
    resetFilters();
  }

  function resetFilters() {
    setVrstaFilter(null);
    setUdomljenFilter(null);
  }

  return (
    <div>
      <ModeContext.Provider value={mode}>
        <Router>
          <div className="App">
            <Navbar changeContext={changeContext} />
            <div className="Content">
              <Routes>
                <Route exact path="/" element={<AboutUs />} />
                <Route
                  path="/popis"
                  element={
                    <div>
                      <Filter
                        udomljenFilter={setUdomljenFilter}
                        vrstaFilter={setVrstaFilter}
                      ></Filter>
                      <Popis
                        animals={filteredAnimals}
                        fetchNewData={refetchAnimals}
                      />
                    </div>
                  }
                />
                <Route path="/unos" element={<Unos add={addAnimal} />} />
                <Route path="/donacije" element={<Donacije />} />
                <Route path="/obavijesti" element={<Obavijesti />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ModeContext.Provider>
    </div>
  );
}
export default MainComponent;
