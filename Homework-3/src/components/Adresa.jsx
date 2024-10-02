import { useContext } from "react";
import { AdresaContext } from "../App";
import Drzava from "./Drzava";
import Tekstinput from "./Tekst_input";

function Adresa() {
  const { ime, adresa, postaviIme, postaviAdresu } = useContext(AdresaContext);
  return (
    <div className="input">
      <div className="tekstinput">
        <Tekstinput
          name="Ime"
          placeholder="Ime..."
          input={ime}
          onChange={(e) => postaviIme(e.target.value)}
        ></Tekstinput>
      </div>
      <Drzava></Drzava>
      <div className="tekstinput">
        <Tekstinput
          name="Adresa"
          placeholder="Adresa..."
          input={adresa}
          onChange={(e) => postaviAdresu(e.target.value)}
        ></Tekstinput>
      </div>
    </div>
  );
}
export default Adresa;
