import profilna from "../../public/profilna.jpg";
import Podaci from "../components/Podaci";
import ProgressBar from "../components/ProgressBar";

function Zivotopis() {
  return (
    <div>
      <h1>Mr Pug</h1>
      <img className="slika" src={profilna} alt="profilna_slika" />
      <div className="podaci">
        <Podaci
          date="20.02.2020."
          address="Ilica 114, 10000, Zagreb"
          contact="Pug, come here, come here!"
        ></Podaci>
      </div>
      <div className="podaci">
        <h2>My abilities</h2>
        <ProgressBar percentage={40} label="Barking"></ProgressBar>
        <ProgressBar percentage={100} label="Sleeping"></ProgressBar>
        <ProgressBar percentage={64} label="Eating"></ProgressBar>
      </div>
    </div>
  );
}

export default Zivotopis;
