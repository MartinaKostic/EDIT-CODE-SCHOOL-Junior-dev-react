import "./Popis.css";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineChip } from "react-icons/hi";
import { useContext } from "react";
import ModeContext from "../ModeContext";
import axios from "axios";

function Popis({ animals, fetchNewData }) {
  const mode = useContext(ModeContext);
  const [editMode, setEditmode] = useState(false);
  const [selectedId, setSelectedid] = useState(null);
  const [form, setForm] = useState({
    ime: null,
    vrsta: null,
    slika: null,
    cip: null,
    godine: null,
    opis: null,
    pregled: null,
    udomljen: null,
  });
  const [isCheckedChip, setIsCheckedChip] = useState(false);
  const [isCheckedAdopted, setIsCheckedAdopted] = useState(false);

  const edit = (animal) => {
    setEditmode(true);
    setSelectedid(animal.id);
    setIsCheckedAdopted(animal.udomljen);
    setIsCheckedChip(animal.cip);
  };

  async function deleteAnimal(id) {
    await axios.delete(`http://localhost:3003/zivotinje/${id}`);
    fetchNewData();
  }

  function handleClose() {
    setEditmode(false);
  }

  async function handleSave(animal) {
    const data = prepareData(animal);
    await axios.put(`http://localhost:3003/zivotinje/${selectedId}`, data);
    setEditmode(false);
    fetchNewData();
  }

  function prepareData(animal) {
    const newData = {
      ime: form.ime != null ? form.ime : animal.ime,
      vrsta: form.vrsta != null ? form.vrsta : animal.vrsta,
      slika: form.slika != null ? form.slika : animal.slika,
      cip: form.cip != null ? form.cip : animal.cip,
      godine: form.godine != null ? form.godine : animal.godine,
      opis: form.opis != null ? form.opis : animal.opis,
      pregled: form.pregled != null ? form.pregled : animal.pregled,
      udomljen: form.udomljen != null ? form.udomljen : animal.udomljen,
    };
    return newData;
  }

  function inputChange(event) {
    const { name, value } = event.target;

    if (name == "slika") {
      setForm({ ...form, [name]: event.target.files[0].name });
    } else if (name == "cip") {
      setIsCheckedChip((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else if (name == "udomljen") {
      setIsCheckedAdopted((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
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
                  name="ime"
                  defaultValue={animal.ime}
                  onChange={inputChange}
                />
              </label>

              <label>
                Vrsta
                <input
                  name="vrsta"
                  type="text"
                  defaultValue={animal.vrsta}
                  onChange={inputChange}
                />
              </label>
              <label>
                Godine
                <input
                  name="godine"
                  type="number"
                  defaultValue={animal.godine}
                  onChange={inputChange}
                />
              </label>

              <label>
                Zadnji Pregled
                <input
                  name="pregled"
                  type="date"
                  defaultValue={animal.pregled}
                  onChange={inputChange}
                />
              </label>

              <label>
                <span style={{ display: "block" }}>Opis</span>
                <input
                  name="opis"
                  type="text"
                  defaultValue={animal.opis}
                  onChange={inputChange}
                />
              </label>

              <label style={{ display: "block" }}>
                Čipiran
                <input
                  name="cip"
                  type="checkbox"
                  defaultValue={animal.cip}
                  checked={isCheckedChip}
                  onChange={inputChange}
                />
              </label>

              <label>
                Udomljen
                <input
                  name="udomljen"
                  type="checkbox"
                  defaultValue={animal.udomljen}
                  checked={isCheckedAdopted}
                  onChange={inputChange}
                />
              </label>

              <input
                type="file"
                name="slika"
                accept="image/*"
                onChange={inputChange}
                required
              ></input>

              <div>
                <button className="botun" onClick={() => handleSave(animal)}>
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

              <h1>{animal.ime}</h1>

              <div className="info">
                {animal.udomljen ? (
                  <div style={{ marginRight: "10px" }}>
                    <BiHomeAlt />
                    <span>Udomljen</span>
                  </div>
                ) : (
                  <div style={{ marginRight: "10px" }}>
                    <BiHomeAlt />
                    <span>Neudomljen</span>
                  </div>
                )}
                {animal.cip ? (
                  <div>
                    <HiOutlineChip />
                    <span>Čipiran</span>
                  </div>
                ) : (
                  <div>
                    <HiOutlineChip />
                    <span>Nečipiran </span>
                  </div>
                )}
              </div>

              <h3>Vrsta: {animal.vrsta}</h3>
              <p>Godine: {animal.godine}</p>
              <p>Opis: {animal.opis}</p>
              <p>Zadnji pregled:{animal.pregled}</p>

              {mode == "korisnik" ? (
                <button>Udomi</button>
              ) : (
                <div>
                  <button onClick={() => edit(animal)}>Uredi</button>
                  <button onClick={() => deleteAnimal(animal.id)}>
                    Izbriši
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default Popis;
