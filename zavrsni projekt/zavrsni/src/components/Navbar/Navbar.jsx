import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ModeContext from "../ModeContext";
//o nama exact
export default function Navbar() {
  const history = useNavigate();
  const mode = useContext(ModeContext);

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
      {mode != "admin" ? (
        <div className="navigation">
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/popis"
          >
            Popis
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/unos"
          >
            Unos
          </NavLink>
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
          <button>ADMIN</button>
        </div>
      ) : (
        <div className="navigation">
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/"
          >
            O nama
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/popis"
          >
            Popis
          </NavLink>
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
        </div>
      )}
    </nav>
  );
}
