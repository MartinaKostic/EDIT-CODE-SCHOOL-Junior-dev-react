import "./Popis.css";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import axios from "axios";

function Popis({ animals }) {
  const [editMode, setEditmode] = useState(false);
  const [selectedId, setSelectedid] = useState(null);

  const edit = (id) => {
    setEditmode(true);
    setSelectedid(id);
  };

  function handleClose() {
    setEditmode(false);
  }
  /* 
  async function getNew() {
    const rez = await axios.get("http://localhost:3002/ormar");
    postaviNoviOrmar(rez.data);
  } */

  async function handleSave() {
    await axios.patch(`http://localhost:3003/zivotinje/${selectedId}`, {});
    setEditmode(false);

    /*     getNew();
     */
  }

  return (
    <div className="popis-grid">
      {animals.map((animal) => (
        <div key={animal.id} className="animal">
          {editMode && selectedId == animal.id ? (
            <div>
              <label>
                Ime
                <input
                  type="text"
                  defaultValue={animal.ime}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <label>
                Vrsta
                <input
                  type="text"
                  defaultValue={animal.vrsta}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>
              <label>
                Godine
                <input
                  type="number"
                  defaultValue={animal.godine}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <label>
                Zadnji Pregled
                <input
                  type="date"
                  defaultValue={animal.pregled}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <label>
                <span style={{ display: "block" }}>Opis</span>
                <input
                  type="text"
                  defaultValue={animal.opis}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <label style={{ display: "block" }}>
                Čipiran
                <input
                  type="checkbox"
                  defaultValue={animal.cip}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <label>
                Udomljen
                <input
                  type="checkbox"
                  defaultValue={animal.udomljen}
                  //onChange={(e) => setNova_velicina(e.target.value)}
                />
              </label>

              <div>
                <button className="botun" onClick={handleSave}>
                  <BsCheckLg />
                </button>
                <button className="botun" onClick={handleClose}>
                  <CgClose />
                </button>
              </div>
            </div>
          ) : (
            <>
              <img src={animal.slika} alt={animal.ime} />

              <h2>{animal.ime}</h2>
              <h3>Vrsta: {animal.vrsta}</h3>
              <p>
                {animal.cip ? <span>Čipiran</span> : <span>Nečipiran </span>},
                {animal.godine},{animal.opis},{animal.pregled},
                {animal.udomljen ? (
                  <span>Udomljen</span>
                ) : (
                  <span>Neudomljen</span>
                )}
              </p>

              <div>
                <button>Udomi</button>
                <button onClick={() => edit(animal.id)}>Uredi</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default Popis;
