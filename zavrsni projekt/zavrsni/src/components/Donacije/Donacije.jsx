import { useState, useEffect } from "react";
import axios from "axios";
import "./Donacije.css";
import ListaDonacija from "./ListaDonacija";
import { useContext } from "react";
import ModeContext from "../ModeContext";

function Donacije() {
  const mode = useContext(ModeContext);
  const [openForm, setOpenForm] = useState(false);
  const [donacije, setDonacije] = useState([]);
  const [form, setForm] = useState({
    tip: "",
    iznos: "",
    opis: "",
  });

  const tipDonacije = ["hrana", "lijekovi", "igračke", "veterinarski troškovi"];

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:3003/donacije")
      .then((res) => setDonacije(res.data))
      .catch((err) => console.log(err.message));
  }

  const sendData = (e) => {
    console.log(form.iznos);
    e.preventDefault();
    const send = {
      kategorija: mode == "admin" ? "trazi" : "nudi",
      tip: form.tip,
      opis: form.opis,
      vrijednost: Number(form.iznos),
    };
    console.log(send);
    axios.post("http://localhost:3003/donacije", send).then((rez) => {
      fetchData();
    });
    setOpenForm(false);
    setForm({});
  };

  function inputChange(event) {
    console.log(event);
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  async function handleSave() {}

  return (
    <div>
      <button className="botun" onClick={() => setOpenForm(true)}>
        Nova Donacija
      </button>
      {openForm ? (
        <div>
          <form className="forma" onSubmit={sendData}>
            <div>
              <label>
                Tip:
                <select
                  name="tip"
                  value={form.tip}
                  onChange={inputChange}
                  required
                >
                  <option value="">--Odaberi vrstu životinje--</option>
                  {tipDonacije.map((tip) => (
                    <option key={tip} value={tip}>
                      {tip}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Iznos u kunama:
                <input
                  type="number"
                  name="iznos"
                  defaultValue={form.iznos}
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
              <button onClick={() => setOpenForm(false)}>Cancel</button>
              <button className="add" type="submit">
                Dodaj!
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <ListaDonacija donacije={donacije} refetch={fetchData}></ListaDonacija>
    </div>
  );
}
export default Donacije;
