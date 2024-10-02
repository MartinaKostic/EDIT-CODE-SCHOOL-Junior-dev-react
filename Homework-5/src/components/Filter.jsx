import { useState } from "react";
function Filter({ dodaj }) {
  const [selected, setSelected] = useState(null);
  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    dodaj(e.target.value);
  };
  const clearFilter = () => {
    setSelected(null);
    dodaj(null);
  };
  return (
    <div>
      <label>
        <input
          type="radio"
          name="filter"
          value="majica"
          checked={selected === "majica"}
          onChange={handleOptionChange}
        />
        Majica
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="hlače"
          checked={selected === "hlače"}
          onChange={handleOptionChange}
        />
        Hlače
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="suknja"
          checked={selected === "suknja"}
          onChange={handleOptionChange}
        />
        Suknja
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="haljina"
          checked={selected === "haljina"}
          onChange={handleOptionChange}
        />
        Haljina
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="košulja"
          checked={selected === "košulja"}
          onChange={handleOptionChange}
        />
        Košulja
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="kaput"
          checked={selected === "kaput"}
          onChange={handleOptionChange}
        />
        Kaput
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="džemper"
          checked={selected === "džemper"}
          onChange={handleOptionChange}
        />
        Džemper
      </label>
      <button className="botun" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
}
export default Filter;
