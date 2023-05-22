import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { CgClose } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext } from "react";
import OsvjezavanjeContext from "./OsvjezavanjeContext";

function RedakTablice({ rez, redniBroj }) {
  const [editMode, setEditmode] = useState(false);
  const [selectedId, setSelectedid] = useState(null);
  const [nova_vrsta, setNova_vrsta] = useState(rez.odjeca.vrsta);
  const [nova_velicina, setNova_velicina] = useState(rez.odjeca.velicina);
  const [nova_cijena, setNova_cijena] = useState(rez.odjeca.cijena);
  const [nova_slika, setNova_slika] = useState(rez.odjeca.slika);
  const [nova_boja, setNova_boja] = useState(rez.odjeca.boja);
  const postaviNoviOrmar = useContext(OsvjezavanjeContext);
  const [vrsta, postaviVrstu] = useState([]);
  const [boje, postaviBoje] = useState([]);
  const stil = {
    backgroundColor: `${rez.odjeca.boja}`,
    height: "50px",
    width: "50px",
    borderRadius: "50px",
  };
  function uredi(id) {
    setEditmode(true);
    setSelectedid(id);
  }

  function handleClose() {
    setEditmode(false);
  }
  async function getNew() {
    const rez = await axios.get("http://localhost:3002/ormar");
    postaviNoviOrmar(rez.data);
  }
  async function handleSave() {
    setEditmode(false);
    await axios
      .patch(`http://localhost:3002/ormar/${selectedId}`, {
        odjeca: {
          vrsta: nova_vrsta,
          velicina: nova_velicina,
          cijena: nova_cijena,
          boja: nova_boja,
          slika: nova_slika,
        },
      })
      .then((rez) => console.log(rez));
    getNew();
  }

  async function brisiPodatak(idPodatka) {
    await axios.delete(`http://localhost:3002/ormar/${idPodatka}`);
    getNew();
  }
  useEffect(() => {
    axios
      .get("http://localhost:3002/vrsta_odjece")
      .then((rez) => postaviVrstu(rez.data))
      .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:3002/boje")
      .then((rez) => postaviBoje(rez.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <tr>
      <td>{redniBroj + 1}</td>
      <td>
        {editMode && selectedId == rez.id ? (
          <select
            name="vrsta"
            defaultValue={rez.odjeca.vrsta}
            onChange={(e) => setNova_vrsta(e.target.value)}
            required
          >
            <option value="">--Odaberi vrstu odjeće--</option>
            {vrsta.map((vrsta) => (
              <option key={vrsta} value={vrsta}>
                {vrsta}
              </option>
            ))}
          </select>
        ) : (
          <>{rez.odjeca.vrsta}</>
        )}
      </td>
      <td>
        {editMode && selectedId == rez.id ? (
          <input
            type="text"
            defaultValue={rez.odjeca.velicina}
            onChange={(e) => setNova_velicina(e.target.value)}
          />
        ) : (
          <>{rez.odjeca.velicina}</>
        )}
      </td>
      <td>
        {editMode && selectedId == rez.id ? (
          <input
            type="color"
            name="boja"
            value={rez.odjeca.boja}
            onChange={(e) => setNova_boja(e.target.value)}
            required
          ></input>
        ) : (
          <h1 style={stil}></h1>
        )}
      </td>
      <td>
        {editMode && selectedId == rez.id ? (
          <input
            type="number"
            defaultValue={rez.odjeca.cijena}
            onChange={(e) => setNova_cijena(e.target.value)}
          />
        ) : (
          <>{rez.odjeca.cijena}</>
        )}
      </td>
      {
        <td>
          {editMode && selectedId == rez.id ? (
            <input
              type="file"
              name="slika"
              accept="image/*"
              onChange={(e) => setNova_slika(e.target.files[0].name)}
              required
            ></input>
          ) : (
            <img
              className="slika"
              src={`http://localhost:5173/public/${rez.odjeca.slika}`}
            />
          )}
        </td>
      }
      <td>
        {editMode && selectedId == rez.id ? (
          <div>
            <button className="botun" onClick={handleSave}>
              <BsCheckLg />
            </button>
            <button className="botun" onClick={handleClose}>
              <CgClose />
            </button>
          </div>
        ) : (
          <button className="botun" onClick={() => uredi(rez.id)}>
            Uredi
          </button>
        )}
      </td>
      <td>
        <button className="botun" onClick={() => brisiPodatak(rez.id)}>
          <RiDeleteBinLine></RiDeleteBinLine>
        </button>
      </td>
    </tr>
  );
}
export default RedakTablice;
