import { useContext } from "react";
import { KontaktContext } from "../App";

import Tekstinput from "./Tekst_input";

function Kontakt() {
  const { kontakt, postaviKontakt } = useContext(KontaktContext);
  return (
    <Tekstinput
      name="Kontakt"
      placeholder="Email adresa.."
      input={kontakt}
      onChange={(e) => postaviKontakt(e.target.value)}
    ></Tekstinput>
  );
}
export default Kontakt;
