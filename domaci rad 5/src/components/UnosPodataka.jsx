import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function UnosPodataka(props) {
  const [formaPodaci, postaviPodatke] = useState({
    vrsta: "",
    velicina: "",
    boja: "",
    cijena: "",
    slika: "",
  });
  const [vrsta, postaviVrstu] = useState([]);
  const [boje, postaviBoje] = useState([]);

  const saljiPodatke = (e) => {
    e.preventDefault();
    const zaSlanje = obradiPodatke(formaPodaci);
    axios.post("http://localhost:3002/ormar", zaSlanje).then((rez) => {
      props.dodaj((stanje) => [...stanje, rez.data]);
    });
  };

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

  function promjenaUlaza(event) {
    console.log(event);
    const { name, value } = event.target;
    if (name == "slika") {
      postaviPodatke({ ...formaPodaci, [name]: event.target.files[0].name });
    } else postaviPodatke({ ...formaPodaci, [name]: value });
  }

  function obradiPodatke(objekt) {
    return {
      odjeca: {
        vrsta: objekt.vrsta,
        velicina: objekt.velicina,
        boja: objekt.boja,
        cijena: Number(objekt.cijena),
        slika: objekt.slika,
      },
    };
  }
  return (
    <form className="forma" onSubmit={saljiPodatke}>
      <div className="forma_rubrika">
        <label>
          Vrsta:
          <select
            name="vrsta"
            value={formaPodaci.vrsta}
            onChange={promjenaUlaza}
            required
          >
            <option value="">--Odaberi vrstu odjeće--</option>
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
          Veličina:
          <input
            className="input"
            type="text"
            name="velicina"
            value={formaPodaci.velicina}
            onChange={promjenaUlaza}
            required
          ></input>
        </label>
      </div>
      <div className="forma_rubrika">
        <label>
          Boja:
          <input
            type="color"
            name="boja"
            value={formaPodaci.boja}
            onChange={promjenaUlaza}
            required
          ></input>
        </label>
      </div>
      <div className="forma_rubrika">
        <label>
          Cijena:
          <input
            type="number"
            name="cijena"
            value={formaPodaci.cijena}
            onChange={promjenaUlaza}
            required
          ></input>
        </label>
      </div>
      <div className="forma_rubrika">
        <label>
          Slika:
          <input
            type="file"
            name="slika"
            accept="image/*"
            onChange={promjenaUlaza}
            required
          ></input>
        </label>
      </div>
      <button className="botun" type="submit">
        Dodaj!
      </button>
    </form>
  );
}
export default UnosPodataka;
