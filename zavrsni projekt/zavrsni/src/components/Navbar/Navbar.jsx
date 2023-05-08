import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ModeContext from "../ModeContext";

//o nama exact
export default function Navbar({ changeContext }) {
  const modeContextValue = useContext(ModeContext);
  const mode = useContext(ModeContext);

  const changeMode = () => {
    changeContext();
  };

  return (
    <nav className="navbar">
      <div className="logotip">
        <img
          src="../../../public/pet-house.png"
          alt="Udomi Me"
          className="ikona"
        ></img>
        <h1>Udomi Me</h1>
      </div>
      <div className="navigation">
        {mode == "korisnik" ? (
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/"
          >
            O nama
          </NavLink>
        ) : null}

        <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/popis"
        >
          Popis
        </NavLink>
        {mode == "admin" ? (
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/unos"
          >
            Unos
          </NavLink>
        ) : null}
        <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/donacije"
        >
          Donacije
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/obavijesti"
        >
          Obavijesti
        </NavLink>
        <div className="contextButton">
          <label className="toggle-switch">
            <span>ADMIN</span>
            <input
              type="checkbox"
              name="admin"
              checked={modeContextValue == "admin"}
              onChange={changeMode}
            ></input>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </nav>
  );
}
