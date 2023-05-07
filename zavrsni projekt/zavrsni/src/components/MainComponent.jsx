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
  const mode = useContext(ModeContext);
  const [animals, setAnimals] = useState([]);
  const [notice, setNotice] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [udomljenFilter, setUdomljenFilter] = useState(null);
  const [vrstaFilter, setVrstaFilter] = useState("");

  //dohvati sve zivotinje
  useEffect(() => {
    axios.get("http://localhost:3003/zivotinje").then((rez) => {
      setAnimals(rez.data);
      setFilteredAnimals(rez.data);
    });
    axios.get("http://localhost:3003/obavijesti").then((rez) => {
      setNotice(rez.data);
    });
  }, []);

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

  return (
    <div>
      <Router>
        <div className="App">
          <Navbar mode={mode} />
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
                    <Popis animals={filteredAnimals} />
                  </div>
                }
              />
              <Route path="/unos" element={<Unos add={filteredAnimals} />} />
              <Route path="/donacije" element={<Donacije />} />
              <Route
                path="/obavijesti"
                element={<Obavijesti notice={notice} setnotice={setNotice} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
export default MainComponent;
