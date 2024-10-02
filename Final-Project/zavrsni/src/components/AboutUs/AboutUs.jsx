import "./AboutUs.css";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

function AboutUs() {
  const marker = [{ geocode: [43.357249, 16.950517], popUp: "Udomi Me" }];
  const customIcon = new Icon({
    iconUrl: "../../../public/pet-house.png",
    iconSize: [38, 38],
  });
  return (
    <div className="udomi">
      <h1>Udomi Me</h1>
      <div className="onama">
        <div className="picture">
          <img src="../../../public/landing.jpg" alt="Udomi" />
        </div>

        <p className="p">
          Udomi Me je azil za životinje smješten u Baškoj Vodi, posvećen
          pronalaženju novih domova za napuštene i zlostavljane životinje.
          Osnovan je 2012. godine, a tim se sastoji od stručnjaka koji su
          posvećeni brizi i skrbi za životinje. U azilu se nalaze psi i mačke
          svih dobnih skupina i veličina, a svi su oni cijepljeni,
          sterilizirani/kastrirani i spremni za udomljavanje. Udomi Me radi na
          tome da educira ljude o važnosti udomljavanja životinja te organizira
          razne aktivnosti kako bi povećao svijest javnosti o problemima
          napuštenih životinja.
        </p>
      </div>

      <div className="section">
        <h1>Gdje se nalazimo?</h1>
        <p className="pp">
          U Baškoj Vodi kod Makarske. Adresa: Ul. Zrinskih i Frankopana 40
        </p>

        <MapContainer center={[43.358452, 16.9478]} zoom={16}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker.map((m) => (
            <Marker key={m.geocode} position={m.geocode} icon={customIcon}>
              <Popup>{m.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="section">
        <h1>Kontakt forma</h1>
        <p>Kontaktirajte nas!</p>
        <form className="forma">
          <div>
            <label>
              E-mail:
              <input
                className="input"
                type="text"
                name="mail"
                placeholder="Unesite e-mail"
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              Tekst:
              <input
                className="input"
                type="text"
                name="text"
                placeholder="Unesite tekst"
                required
              ></input>
            </label>
          </div>

          <button type="submit">Pošalji!</button>
        </form>
      </div>
    </div>
  );
}

export default AboutUs;
