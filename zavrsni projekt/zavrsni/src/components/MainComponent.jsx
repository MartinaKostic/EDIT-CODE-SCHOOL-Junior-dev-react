import { useContext } from "react";
import ModeContext from "./ModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs/AboutUs";
import Popis from "./Popis/Popis";
import Obavijesti from "./Obavijesti/Obavijesti";
import Unos from "./Unos/Unos";
import Donacije from "./Donacije/Donacije";
import Navbar from "./Navbar/Navbar";
function MainComponent() {
  const mode = useContext(ModeContext);
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar mode={mode} />
          <div className="Content">
            <Routes>
              <Route exact path="/" element={<AboutUs />} />
              <Route path="/popis" element={<Popis />} />
              <Route path="/unos" element={<Unos />} />
              <Route path="/donacije" element={<Donacije />} />
              <Route path="/obavijesti" element={<Obavijesti />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
export default MainComponent;
