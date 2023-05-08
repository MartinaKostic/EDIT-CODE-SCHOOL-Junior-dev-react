import { useState, useEffect } from "react";
import axios from "axios";
import "./Unos.css";
import { useNavigate } from "react-router-dom";

function Unos(props) {
  const [form, setForm] = useState({
    ime: "",
    vrsta: "",
    slika: "",
    cip: false,
    godine: 0,
    opis: "",
    pregled: new Date(),
    udomljen: false,
  });
  const [vrsta, setVrsta] = useState([]);
  const [isCheckedChip, setIsCheckedChip] = useState(false);
  const [isCheckedAdopted, setIsCheckedAdopted] = useState(false);
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    const send = formatData(form);
    console.log(send);
    axios.post("http://localhost:3003/zivotinje", send).then((res) => {
      props.add(res.data);
      navigate("/popis");
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/vrsta")
      .then((rez) => setVrsta(rez.data))
      .catch((err) => console.log(err.message));
  }, []);

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

  function formatData(objekt) {
    return {
      ime: objekt.ime,
      vrsta: objekt.vrsta,
      cip: objekt.cip,
      opis: objekt.opis,
      godine: Number(objekt.godine),
      slika: objekt.slika,
      pregled: objekt.pregled,
      udomljen: objekt.udomljen,
    };
  }

  return (
    <form className="forma" onSubmit={sendData}>
      <div>
        <label>
          Vrsta:
          <select
            name="vrsta"
            value={form.vrsta}
            onChange={inputChange}
            required
          >
            <option value="">--Odaberi vrstu životinje--</option>
            {vrsta.map((vrsta) => (
              <option key={vrsta} value={vrsta}>
                {vrsta}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Ime:
          <input
            className="input"
            type="text"
            name="ime"
            value={form.ime}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>

      <div>
        <label>
          Godine:
          <input
            type="number"
            name="godine"
            value={form.cijena}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div>
        <label>
          <span style={{ display: "block" }}>Opis</span>
          <textarea
            className="input"
            type="text"
            name="opis"
            value={form.opis}
            onChange={inputChange}
          ></textarea>
        </label>
      </div>
      <div>
        <label>
          Slika:
          <input
            type="file"
            name="slika"
            accept="image/*"
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div>
        <label>
          Pregled:
          <input
            className="input"
            type="date"
            name="pregled"
            value={form.pregled}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div className="toggle">
        <span>Cip</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="cip"
            checked={isCheckedChip}
            onChange={inputChange}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="toggle">
        <span>Udomljen</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="udomljen"
            checked={isCheckedAdopted}
            onChange={inputChange}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
      <button className="add" type="submit">
        Dodaj!
      </button>
    </form>
  );
}
export default Unos;
