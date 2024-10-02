import { useState } from "react";
import "./Donacije.css";
import { useContext } from "react";
import ModeContext from "../ModeContext";
import axios from "axios";

function ListaDonacija({ donacije, refetch }) {
  const mode = useContext(ModeContext);

  const handleDonirano = async (id) => {
    await axios.patch(`http://localhost:3003/donacije/${id}`, {
      kategorija: "donirano",
    });
    refetch();
  };

  const handleIzbrisi = async (id) => {
    await axios.delete(`http://localhost:3003/donacije/${id}`);
    refetch();
  };

  const handlePonovi = async (id) => {
    await axios.patch(`http://localhost:3003/donacije/${id}`, {
      kategorija: "trazi",
    });
    refetch();
  };

  return (
    <div>
      <div>
        <h3 className="title">Traži se</h3>
        {donacije.length &&
          donacije
            .filter((d) => d.kategorija == "trazi")
            .map((donacija) => (
              <div key={donacija.id} className="donacija">
                <p>
                  Tip: <span className="detalji">{donacija.tip}</span>
                </p>
                <p>
                  Iznos: <span className="detalji">{donacija.vrijednost}</span>
                </p>
                <p>
                  Opis: <span className="detalji">{donacija.opis}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonirano(donacija.id)}
                    >
                      Donirano
                    </button>
                    <button
                      className="add"
                      onClick={() => handleIzbrisi(donacija.id)}
                    >
                      Izbriši
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonirano(donacija.id)}
                    >
                      Doniraj
                    </button>
                  </div>
                )}
              </div>
            ))}
      </div>
      <div>
        <h3 className="title">Nudi se</h3>
        {donacije.length &&
          donacije
            .filter((d) => d.kategorija == "nudi")
            .map((donacija) => (
              <div key={donacija.id} className="donacija">
                <p>
                  Tip: <span className="detalji">{donacija.tip}</span>
                </p>
                <p>
                  Iznos: <span className="detalji">{donacija.vrijednost}</span>
                </p>
                <p>
                  Opis: <span className="detalji">{donacija.opis}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonirano(donacija.id)}
                    >
                      Prihvati
                    </button>
                    <button
                      className="add"
                      onClick={() => handleIzbrisi(donacija.id)}
                    >
                      Izbriši
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
      </div>
      <div>
        <h3 className="title">Donirano</h3>
        {donacije.length &&
          donacije
            .filter((d) => d.kategorija == "donirano")
            .map((donacija) => (
              <div key={donacija.id} className="donacija">
                <p>
                  Tip: <span className="detalji">{donacija.tip}</span>
                </p>
                <p>
                  Iznos: <span className="detalji">{donacija.vrijednost}</span>
                </p>
                <p>
                  Opis: <span className="detalji">{donacija.opis}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handlePonovi(donacija.id)}
                    >
                      Ponovi zahtjev
                    </button>
                    <button
                      className="add"
                      onClick={() => handleIzbrisi(donacija.id)}
                    >
                      Izbriši
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
      </div>
    </div>
  );
}
export default ListaDonacija;
