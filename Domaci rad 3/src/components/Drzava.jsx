import { useContext } from "react";
import { AdresaContext } from "../App";
function Drzava() {
  const { drzava, postaviDrzavu } = useContext(AdresaContext);
  return (
    <div className="subcontainer">
      <label htmlFor="izaberi">Država:</label>
      <select
        id="drzava"
        value={drzava}
        onChange={(e) => postaviDrzavu(e.target.value)}
      >
        <option value="Hrvatska">Hrvatska</option>
        <option value="Bugarska">Bugarska</option>
        <option value="Italija">Italija</option>
      </select>
    </div>
  );
}
export default Drzava;
