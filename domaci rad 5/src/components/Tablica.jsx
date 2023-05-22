import RedakTablice from "./RedakTablice";
import "../App.css";

function Tablica({ ormar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Redni broj</th>
          <th>Vrsta odjeće</th>
          <th>Veličina</th>
          <th>Boja</th>
          <th>Cijena</th>
          <th>Slika</th>
          <th>Opcije</th>
          <th>Obriši</th>
        </tr>
      </thead>
      <tbody>
        {ormar.map((r, i) => (
          <RedakTablice key={r.id} rez={r} redniBroj={i} />
        ))}
      </tbody>
    </table>
  );
}
export default Tablica;
