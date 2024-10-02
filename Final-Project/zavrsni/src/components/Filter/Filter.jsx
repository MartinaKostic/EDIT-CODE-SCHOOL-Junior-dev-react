import { useState } from "react";
import "./Filter.css";
function Filter({ udomljenFilter, vrstaFilter }) {
  const [selectedUdomljen, setSelectedUdomljen] = useState(null);
  const [selectedVrsta, setSelectedVrsta] = useState(null);

  const handleUdomljenFilterChange = (e) => {
    if (e.target.name == "filterN") {
      setSelectedUdomljen(false);
      udomljenFilter(false);
    } else {
      setSelectedUdomljen(true);
      udomljenFilter(true);
    }
  };

  const handleVrstaFilterChange = (e) => {
    setSelectedVrsta(e.target.value);
    vrstaFilter(e.target.value);
  };

  const clearUdomljenFilter = () => {
    setSelectedUdomljen(null);
    udomljenFilter(null);
  };

  const clearFilterVrsta = () => {
    setSelectedVrsta(null);
    vrstaFilter(null);
  };
  return (
    <div>
      <div className="filter">
        <label className="filterItem">
          <input
            type="radio"
            name="filterU"
            value={true}
            checked={selectedUdomljen == true}
            onChange={handleUdomljenFilterChange}
          />
          Udomljeni
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filterN"
            value={false}
            checked={selectedUdomljen == false}
            onChange={handleUdomljenFilterChange}
          />
          Neudomljeni
        </label>

        <button className="botun" onClick={clearUdomljenFilter}>
          Ocisti Filter Udomljenja
        </button>
      </div>

      <div className="filter">
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="pas"
            checked={selectedVrsta === "pas"}
            onChange={handleVrstaFilterChange}
          />
          Pas
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="mačka"
            checked={selectedVrsta === "mačka"}
            onChange={handleVrstaFilterChange}
          />
          Mačka
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="kunić"
            checked={selectedVrsta === "kunić"}
            onChange={handleVrstaFilterChange}
          />
          Kunić
        </label>
        <button className="botun" onClick={clearFilterVrsta}>
          Očisti Filter Vrsta
        </button>
      </div>
    </div>
  );
}
export default Filter;
